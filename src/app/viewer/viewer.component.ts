import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var embedpano:any;

let weird = window["weird"];


@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {
   private krpano : any;
   private azimuthA;
   private elevationA;

   private azimuthB;
   private elevationB;
   
   private azimuthC;
   private elevationC;

   private panoA;
   private panoB;
   private panoAId;
   private panoBId;
  
   private selectedFiles = null;
   private userId = null;
   private tourRegion = null;
   private tourName = null;

   private azimuthA1;
   private elevationA1;

   private azimuthB1;
   private elevationB1;

   private azimuthA2;
   private elevationA2;

   private azimuthB2;
   private elevationB2;

   private azimuthA3;
   private elevationA3;

   private azimuthB4;
   private elevationB4;

   constructor(public httpClient: HttpClient){}

  ngOnInit(): void {
  this.krpano =null;
  new embedpano({swf:"http://localhost:8080/tours/files/1003/tour.swf", xml:"http://localhost:8080/tours/files/1003/tour.xml", consolelog:true, target:"pano", html5:"auto", mobilescale:1.0, passQueryParameters:true, onready:this.krpano_onready_callback});
  this.krpano = weird;
  window["weird"] = null;
  
  }

krpano_onready_callback(krpano_interface)
{
  weird = krpano_interface;


}

sendPostRequest(data: any) {
  this.httpClient.post('http://localhost:8080/features/points/position', data).subscribe((res)=>{
            console.log(res);
        });
}



point1(){

  interface GetPanoResponse {
    id: number;
  }

  this.krpano.call("extract_first_angle();");
  this.azimuthA = this.krpano.get("data[first_angle].angle");
  this.elevationA = this.krpano.get("data[first_angle].height");
  this.panoA = this.krpano.get("scene[get(xml.scene)].title");
  console.log(this.panoA);
  this.httpClient.get<GetPanoResponse>('http://localhost:8080/panos/by-name/' + this.panoA).subscribe((res)=>{
          
          this.panoAId = res.id;
          console.log(this.panoAId);
          console.log(this.azimuthA);
          console.log(this.elevationA);
        });
}

point2(){
  
  interface GetPanoResponse {
    id: number;
  }
  
  this.krpano.call("extract_second_angle();");
  this.azimuthB = this.krpano.get("data[second_angle].angle");
  this.elevationB = this.krpano.get("data[second_angle].height");
  this.panoB = this.krpano.get("scene[get(xml.scene)].title");
  console.log(this.panoB);
  this.httpClient.get<GetPanoResponse>('http://localhost:8080/panos/by-name/' + this.panoB).subscribe((res)=>{
          
          this.panoBId = res.id;
          console.log(this.panoBId);
          console.log(this.azimuthB);
          console.log(this.elevationB);
          
        });

 }

 point3(){

  interface GetCalcResponse {
    id: number;
    latitude;
	  longitude;
	  altitude;
  	azimuthFromCam;
	  elevationFromCam;
  }

  var data = {
    "azimuthA": this.azimuthA,
    "elevationA": this.elevationA,
    "azimuthB": this.azimuthB,
    "elevationB": this.elevationB,
    "panoIdA": this.panoAId,
    "panoIdB": this.panoBId,
    "featureName": "Beans",
    "featureComment": "Cool beans, ramadan mubarak",
    "featureType": "bean"
  }

  this.httpClient.post<GetCalcResponse>('http://localhost:8080/features/points',data).subscribe((res)=>{
          
          console.log(res);
          this.krpano.call("add_point_hotspot("+ res.azimuthFromCam +","+ res.elevationFromCam +","+ res.latitude +","+ res.longitude +","+ res.altitude +")");
          this.krpano.call("layer[map].addstylespot('unknown_spot1', " + res.latitude + "," + res.longitude + ", 'null', 'object')");
          this.krpano.call("callwith(layer[map], pantospot('unknown_spot1'))");
        });
   
 }

 height1(){
  this.point1();
 }

 height2(){
  this.point2();
}

height3(){ 
  this.krpano.call("extract_second_angle();");
  this.elevationC = this.krpano.get("data[second_angle].height");
}

height4(){
  interface GetCalcResponse {
    id: number;
    latitude;
	  longitude;
	  altitude;
  	azimuthFromCam;
	  elevationFromCam;
  }

  var baseCalc = {
    "azimuthA": this.azimuthA,
    "elevationA": this.elevationA,
    "azimuthB": this.azimuthB,
    "elevationB": this.elevationB,
    "panoIdA": this.panoAId,
    "panoIdB": this.panoBId,
    "featureName": "Beans",
    "featureComment": "Cool beans, ramadan mubarak",
    "featureType": "bean"
  }

  var heightCalc = {
    "baseCalc": baseCalc,
    "elevation": this.elevationC
  }

  console.log(heightCalc);
  this.httpClient.post<GetCalcResponse>('http://localhost:8080/features/heights',heightCalc).subscribe((res)=>{
          
          console.log(res);
          this.krpano.call("add_point_hotspot("+ res.azimuthFromCam +","+ res.elevationFromCam +","+ res.latitude +","+ res.longitude +","+ res.altitude +")");
          this.krpano.call("layer[map].addstylespot('unknown_spot1', " + res.latitude + "," + res.longitude + ", 'null', 'object')");
          this.krpano.call("callwith(layer[map], pantospot('unknown_spot1'))");
        });
   
}


distance1(){
  interface GetPanoResponse {
    id: number;
  }

  this.krpano.call("extract_first_angle();");
  this.azimuthA1 = this.krpano.get("data[first_angle].angle");
  this.elevationA1 = this.krpano.get("data[first_angle].height");
  this.panoA = this.krpano.get("scene[get(xml.scene)].title");
  console.log(this.panoA);
  this.httpClient.get<GetPanoResponse>('http://localhost:8080/panos/by-name/' + this.panoA).subscribe((res)=>{
          
          this.panoAId = res.id;
        });
}

distance2(){
  this.krpano.call("extract_first_angle();");
  this.azimuthA2 = this.krpano.get("data[first_angle].angle");
  this.elevationA2 = this.krpano.get("data[first_angle].height");
}

distance3(){
  interface GetPanoResponse {
    id: number;
  }

  this.krpano.call("extract_second_angle();");
  this.azimuthB1 = this.krpano.get("data[second_angle].angle");
  this.elevationB1 = this.krpano.get("data[second_angle].height");
  this.panoB = this.krpano.get("scene[get(xml.scene)].title");
  console.log(this.panoB);
  this.httpClient.get<GetPanoResponse>('http://localhost:8080/panos/by-name/' + this.panoB).subscribe((res)=>{
          
          this.panoBId = res.id;
        });
}

distance4(){
  this.krpano.call("extract_second_angle();");
  this.azimuthB2 = this.krpano.get("data[second_angle].angle");
  this.elevationB2 = this.krpano.get("data[second_angle].height");
}

distance5(){
  interface GetCalcResponse {
    id: number;

    latitudeA;
	  longitudeA;
	  altitudeA;
  	azimuthA;
	  elevationA;

    latitudeB;
	  longitudeB;
	  altitudeB;
  	azimuthB;
	  elevationB;

    distance;
  }

  var pointACalc = {
    "azimuthA": this.azimuthA1,
    "elevationA": this.elevationA1,
    "azimuthB": this.azimuthB1,
    "elevationB": this.elevationB1,
    "panoIdA": this.panoAId,
    "panoIdB": this.panoBId,
    "featureName": "Beans",
    "featureComment": "Cool beans, ramadan mubarak",
    "featureType": "bean"
  }

  var pointBCalc = {
    "azimuthA": this.azimuthA2,
    "elevationA": this.elevationA2,
    "azimuthB": this.azimuthB2,
    "elevationB": this.elevationB2,
    "panoIdA": this.panoAId,
    "panoIdB": this.panoBId,
    "featureName": "Beans",
    "featureComment": "Cool beans, ramadan mubarak",
    "featureType": "bean"
  }

  var distanceCalc = {
    "pointACalc": pointACalc,
    "pointBCalc": pointBCalc
  }

  console.log(distanceCalc);
  this.httpClient.post<GetCalcResponse>('http://localhost:8080/features/distances',distanceCalc).subscribe((res)=>{
          
          console.log(res);
          this.krpano.call("add_point_hotspot("+ res.azimuthA +","+ res.elevationA +","+ res.latitudeA +","+ res.longitudeA +","+ res.altitudeA +")");
          this.krpano.call("layer[map].addstylespot('unknown_spot1', " + res.latitudeA + "," + res.longitudeA + ", 'null', 'object')");
          this.krpano.call("callwith(layer[map], pantospot('unknown_spot1'))");

          this.krpano.call("add_point_hotspot("+ res.azimuthB +","+ res.elevationB +","+ res.latitudeB +","+ res.longitudeB +","+ res.altitudeB +")");
          this.krpano.call("layer[map].addstylespot('unknown_spot2', " + res.latitudeB + "," + res.longitudeB + ", 'null', 'object')");
          
        });
   
}

vsurf1(){
   
}

vsurf2(){
   
}

vsurf3(){
   
}

vsurf4(){
   
}

vsurf5(){
   
}

vsurf6(){
   
}
vsurf7(){
   
}


 onFileSelected(event) {
  this.selectedFiles = event.target.files;
}

onUserIdSelected(event) {
  this.userId = event.target.value;
}
onTourNameSelected(event) {
  this.tourName = event.target.value;
}
onTourRegionSelected(event) {
  this.tourRegion = event.target.value;
}

onUpload(){

  if(this.selectedFiles === null || this.selectedFiles.length === 0){
    console.log("No files selected!");
    return;
  }
  
  else {
    //console.log(this.selectedFiles);
    const fd = new FormData();
    Array.prototype.forEach.call(this.selectedFiles, file => {
      console.log(file.name.replace(/\s/g, '_'));
      var filename = file.name;
      fd.append('files', 
      file, Math.random().toString(36).substr(2, 5) +
       "." + 
       filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename);
    });
    fd.append('userId', this.userId);
    fd.append('tourName', this.tourName);
    fd.append('tourRegion', this.tourRegion);
    console.log(fd);
    this.httpClient.post('http://localhost:8080/tours', fd).subscribe((res)=>{
            console.log(res);
        });
  }
  
}

}
