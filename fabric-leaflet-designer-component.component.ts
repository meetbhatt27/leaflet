import { Component, OnInit, ViewEncapsulation, HostListener, ChangeDetectorRef, ViewChild, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { LeafletService } from '../services/leaflet.service';
import { fabric }  from 'fabric'
import * as html2canvas from 'html2canvas';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-fabric-leaflet-designer-component',
  templateUrl: './fabric-leaflet-designer-component.component.html',
  styleUrls: ['./fabric-leaflet-designer-component.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FabricLeafletDesignerComponentComponent implements OnInit, AfterViewInit {
  @ViewChildren('html2Canvas') htmlCanvasList: QueryList<ElementRef>;
  @ViewChildren('screen') screens: QueryList<ElementRef>;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;
  // canavsList:{id:string, canvas:fabric.Canvas};
  canavsList: any;
  currentPage: number;
  selectedDiv: HTMLElement;
  childCanvasElement: HTMLElement;
  startY: any;
  startHeight: any;
  productImages: any;
  droppedData: string;
  isPrinting: boolean = false;
  selectedCanvasObjectParentId: string;
  selectedObjectInCanvasId:any;
  currentBackgroundSelected=0;
  backgroundCOlorList=[
    {
      type:'color',
      code:'#932B2A'
    },
    {
      type:'color',
      code:'#6D0000'
    },
    {
      type:'gradient',
      code:'linear-gradient(#932b2a 0%, #330021 100%)'
    },
    {
      type:'gradient',
      code:'linear-gradient(#6d0000 0%, #863800 100%)'
    },
    {
      type:'pattern',
      code:'',
      backgroundColor: '#6D0000',
      backgroundImage: '../../assets/imgs/patterns/Flat-Mountains.svg',
      backgroundRepeat:'no-repeat',
      backgroundPosition:'bottom',
      backgroundSize:'contain'
    },
    {
      type:'pattern',
      code:'',
      backgroundColor: '#6D0000',
      backgroundImage: '../../assets/imgs/patterns/Hollowed-Boxes.svg',
      backgroundRepeat:'repeat',
      backgroundPosition:'center',
      backgroundSize:'auto'
    },
    {
      type:'pattern',
      code:'',
      backgroundColor: '#6D0000',
      backgroundImage: '../../assets/imgs/patterns/Liquid-Cheese.svg',
      backgroundRepeat:'no-repeat',
      backgroundPosition:'center',
      backgroundSize:'cover'
    },
    {
      type:'pattern',
      code:'',
      backgroundColor: '#6D0000',
      backgroundImage: '../../assets/imgs/patterns/Protruding-Squares.svg',
      backgroundRepeat:'repeat',
      backgroundPosition:'center',
      backgroundSize:'auto'
    },
    {
      type:'pattern',
      code:'',
      backgroundColor: '#6D0000',
      backgroundImage: '../../assets/imgs/patterns/Subtle-Prism_2.svg',
      backgroundRepeat:'no-repeat',
      backgroundPosition:'center',
      backgroundSize:'cover'
    },
    {
      type:'pattern',
      code:'',
      backgroundColor: '#6D0000',
      backgroundImage: '../../assets/imgs/patterns/Sun-Tornado.svg',
      backgroundRepeat:'no-repeat',
      backgroundPosition:'0 0',
      backgroundSize:'cover'
    },
    {
      type:'pattern',
      code:'',
      backgroundColor: '#6D0000',
      backgroundImage: '../../assets/imgs/patterns/Wavey-Fingerprint.svg',
      backgroundRepeat:'repeat',
      backgroundPosition:'top',
      backgroundSize:'auto'
    },
    {
      type:'pattern',
      code:'',
      backgroundColor: '#6D0000',
      backgroundImage: '../../assets/imgs/patterns/Wintery-Sunburst.svg',
      backgroundRepeat:'no-repeat',
      backgroundPosition:'center',
      backgroundSize:'cover'
    }
  ]
  // @ViewChild('canvas', {static: false}) canvas: FabricjsEditorComponent;

  gridCellSize = {
    2: ['large', 'large'],
    3: ['medium', 'medium', 'medium'],
    4: ['small', 'small', 'small', 'small'],
    5: ['medium', 'medium', 'medium', 'large', 'large'],
    6: ['medium', 'medium', 'medium', 'medium', 'medium', 'medium'],
    7: ['small', 'small', 'small', 'small', 'medium', 'medium', 'medium'],
    8: ['small', 'small', 'small', 'small', 'small', 'small', 'small', 'small'],
    9: ['medium', 'medium', 'medium', 'medium', 'medium', 'medium', 'medium', 'medium', 'medium'],
    10: ['small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'large', 'large'],
    11: ['small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'medium', 'medium', 'medium'],
    12: ['small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small'],
    13: ['small', 'small', 'small', 'small', 'medium', 'medium', 'medium', 'medium', 'medium', 'medium', 'medium', 'medium', 'medium'],
    14: ['small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'large', 'large'],
    15: ['small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'medium', 'medium', 'medium'],
    16: ['small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small'],
    17: ['small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'medium', 'medium', 'medium', 'large', 'large'],
    18: ['small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'large', 'large'],
    19: ['small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'medium', 'medium', 'medium'],
    20: ['small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small', 'small']
  }
  numberOfRows = {
    2: 1,
    3: 1,
    4: 1,
    5: 2,
    6: 2,
    7: 2,
    8: 2,
    9: 3,
    10: 3,
    11: 3,
    12: 3,
    13: 4,
    14: 4,
    15: 4,
    16: 4,
    17: 5,
    18: 5,
    19: 5,
    20: 5
  }
  height = {
    2: '115px',
    3: '115px',
    4: '115px',
    5: '230px',
    6: '230px',
    7: '230px',
    8: '230px',
    9: '345px',
    10: '345px',
    11: '345px',
    12: '345px',
    13: '460px',
    14: '460px',
    15: '460px',
    16: '460px',
    17: '575px',
    18: '575px',
    19: '575px',
    20: '575px'
  }

  // @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
  //   let result = confirm("Changes you made may not be saved.");
  //   if (result) {
  //   }
  //   event.returnValue = false; // stay on same page
  // }

  // @HostListener("click", ["$event"])
  // handleClick(event) {
  //   console.log('clicked here---',event);
  // }

  @HostListener("mousemove", ["$event"])
  doDrag(event) {
    if (this.selectedDiv != null && this.selectedDiv != undefined) {
      // console.log("perform drag", event);
      this.selectedDiv.style.height = (this.startHeight + event.clientY - this.startY) + 'px';
      this.chngeDetectorRef.detach();
      // this.childCanvasElement.style.height=this.selectedDiv.style.height;
    }
    // else{
    //   console.log("DONT DO");
    // }
  }
  @HostListener("mouseup", ["$event"])
  cancelDrag(event) {
    if (this.selectedDiv != null && this.selectedDiv != undefined) {
      this.stopDragEvent(event);
      this.chngeDetectorRef.reattach();
      this.resizeInnerCanvasElements();

    }
  }

  @HostListener('document:keyup', ['$event'])
  handleImageDelete(event){
    console.log(event);
    if(event.code=='Backspace' || event.code=='Delete'){
      this.deleteObject();
    }
  }
  constructor(public leafletService: LeafletService, public chngeDetectorRef: ChangeDetectorRef, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.currentPage = 0;
    this.changeTabToThis(this.currentPage);
    this.productImages = [];
  }

  changeTabToThis(pageNumber) {
    this.currentPage = pageNumber;
    let wraps: any = document.getElementsByClassName("wrap");
    for (let i = 0; i < wraps.length; i++) {
      let transformVal = pageNumber * 565.81;
      let element = wraps[i];
      element.style.transform = 'translateX(-' + transformVal + 'px)';
    }
  }

  ngAfterViewInit() {
    console.log("LEAFLET OBJECT----", this.leafletService.pageData);
    this.canavsList = {};
    console.log("this.htmlCanvasList.length---", this.htmlCanvasList.length);
    this.htmlCanvasList.forEach((element, index) => {
      let dataType = element.nativeElement.attributes['data'].value;
      let canvasId = element.nativeElement.attributes['id'].value;

      //console.log("element-----html2canvas" + canvasId, element);

      let canvasTemp = new fabric.Canvas(element.nativeElement, {
        hoverCursor: 'pointer',
        selection: true,
        selectionBorderColor: 'blue',
        // cornerColor: 'red',
        // cornerSize: 5,
        // objectCaching:false
      });

      canvasTemp.on({
         'object:moving': (e) => {
          //  console.log('moving the obkects',e);
          //  let obj = e.target;
          //  if(obj.height > obj.canvas.height || obj.width > obj.canvas.width){
          //    obj.setScaleY(obj.originalState.scaleY);
          //    obj.setScaleX(obj.originalState.scaleX);        
          //  }
          //  obj.setCoords();
          //  if(obj.getBoundingRect().top - (obj.cornerSize / 2) < 0 || 
          //     obj.getBoundingRect().left -  (obj.cornerSize / 2) < 0) {
          //    obj.top = Math.max(obj.top, obj.top-obj.getBoundingRect().top + (obj.cornerSize / 2));
          //    obj.left = Math.max(obj.left, obj.left-obj.getBoundingRect().left + (obj.cornerSize / 2));    
          //  }
          //  if(obj.getBoundingRect().top+obj.getBoundingRect().height + obj.cornerSize  > obj.canvas.height || obj.getBoundingRect().left+obj.getBoundingRect().width + obj.cornerSize  > obj.canvas.width) {
         
          //    obj.top = Math.min(obj.top, obj.canvas.height-obj.getBoundingRect().height+obj.top-obj.getBoundingRect().top - obj.cornerSize / 2);
          //    obj.left = Math.min(obj.left, obj.canvas.width-obj.getBoundingRect().width+obj.left-obj.getBoundingRect().left - obj.cornerSize /2);    
          //  }
         },
        // 'object:modified': (e) => { },
        'mouse:down': (e) => {
          console.log("SELECTED---", e.e);
          const selectedObject = e.target;
          let evObject=e.e;
          setTimeout(() => {
            console.log("SELECTED-1--",evObject["path"][2].getAttribute('id'));
            if (evObject["path"] != null && evObject["path"] != undefined && evObject["path"].length >= 2) {
              this.selectedObjectInCanvasId=evObject["path"][2].getAttribute('id');
              this.deselectOthers(evObject["path"][2].getAttribute('id'));

            }
          }, 20);

          if (e.target != null && e.target != undefined) {
            // this.selected = selectedObject;
            selectedObject.hasRotatingPoint = true;
            selectedObject.transparentCorners = false;
          //  selectedObject.selectionColor = 'rgba(255,119,0,0.3)';
            selectedObject.cornerSize = 5;
            selectedObject.transparentCorners = false;
            selectedObject.cornerColor = '#eee';
          }
        },
        // 'selection:cleared': (e) => {
        //   // this.selected = null;
        //   // this.resetPanels();
        //   const selectedObject = e.target;
        //   console.log("SELECTION CLEARED----", e);
        // }
      });
      //if(dataType=='row-element')
      //canvasTemp.setWidth(document.getElementsByClassName('row-item')[0].clientWidth);
      // this.canvas.setWidth(this.size.width);
      // this.canvas.setHeight(this.size.height);

      // // get references to the html canvas element & its context
      // canvasTemp.on('mouse:down', (e) => {
      //   const canvasElement: any = document.getElementById('canvas');
      // });

      this.canavsList[(canvasId)] = canvasTemp;
      if (index == this.htmlCanvasList.length - 1) {

        this.resizeInnerCanvasElements().then(() => {
          this.addContent();
        })
      }
      //this.canavsList.push(canvasTemp);
    })
  }

  deselectOthers(selectedCanvasId) {
    console.log("selectedCanvasId---", selectedCanvasId, this.canavsList);
    this.selectedCanvasObjectParentId = selectedCanvasId;
    Object.keys(this.canavsList).forEach((canvasObject, index) => {
      if (canvasObject != selectedCanvasId + '-canvas') {
        this.canavsList[(canvasObject)].discardActiveObject().renderAll();
      }
      else {
        console.log("canvasObject---", canvasObject);
      }
    })
  }

  addContent() {
    Object.keys(this.canavsList).forEach(canvasObject => {
      let tempid = canvasObject.split('-canvas')[0];
      // console.log("xtempid-----", tempid);
      if (canvasObject == 'leaflet-intro-header-canvas') {
        this.addheaderInformation(this.canavsList[(canvasObject)]);
      }
      if (canvasObject.indexOf('item') > -1) {
        this.addItemsInformation(canvasObject, this.canavsList[(canvasObject)])
      }
      if (canvasObject.indexOf('head-') > -1) {
        this.addSectionInformation(canvasObject, this.canavsList[(canvasObject)]);
      }
      if (canvasObject == 'leaflet-footer-main-canvas') {
        this.addFooterInfromation(this.canavsList[(canvasObject)]);
      }
      if(canvasObject.indexOf('one-line-footer-page')>-1){
        this.addUsagePolicyInfo(this.canavsList[(canvasObject)]);
      }
      //  this.selectItemAfterAdded(image);
      // const text = new fabric.Textbox("Hello text", {
      //   top: 10,
      //   textAlign: 'center',
      //   fontFamily: 'helvetica',
      //   angle: 0,
      //   fill: '#000000',
      //   fontWeight: 'bold',
      //   hasRotatingPoint: true,
      //   fontSize: 40
      // });
      // this.extend(text, "testId" + index);

      // canvasTemp.add(text);
      // canvasTemp.centerObjectH(text);
      // text.setCoords();

      // this.canavsList[(canvasObject)].renderAll();
    })

  }

  addheaderInformation(canvasTemp: fabric.Canvas) {
    //add store logo
    if (this.leafletService.storeInformation.storeImage != null && this.leafletService.storeInformation.storeImage != undefined && this.leafletService.storeInformation.storeImage != '') {
      let img = new Image();
      img.src = this.leafletService.storeInformation.storeImage;
      let storeLogo = new fabric.Image(img, {
        left: 10,
        top: 10,
        angle: 0,
        padding: 10,
        cornerSize: 10,
        hasRotatingPoint: true
      });

      storeLogo.scaleToHeight(100);
      this.extend(storeLogo, 'store-logo');
      canvasTemp.add(storeLogo);
      canvasTemp.renderAll();
    }

    if (this.leafletService.storeInformation.tagLine != null && this.leafletService.storeInformation.tagLine != undefined && this.leafletService.storeInformation.tagLine != '') {
      let text = new fabric.Textbox(this.leafletService.storeInformation.tagLine, {
        top: 120,
        width: 500,
        textAlign: 'center',
        fontFamily: 'Smythe',
        angle: 0,
        fill: '#ffffff',
        fontWeight: 'bold',
        hasRotatingPoint: true,
        fontSize: 20,
        //fixedWidth: 500,
        isWrapping: true,
        lineHeight: 1,
        strokeWidth: 2,
        strokeUniform: true,
        stroke: '#000000',
        paintFirst: "stroke"
      });

      this.extend(text, "testId");
      canvasTemp.add(text);
      canvasTemp.centerObjectH(text);
      text.setCoords();
      canvasTemp.renderAll();
    }

    if (this.leafletService.storeInformation.yellowBannerMainText1 != null || this.leafletService.storeInformation.yellowBannerMainText1 != undefined || this.leafletService.storeInformation.yellowBannerMainText1 != '' || this.leafletService.storeInformation.yellowBannerMainText2 != null || this.leafletService.storeInformation.yellowBannerMainText2 != undefined || this.leafletService.storeInformation.yellowBannerMainText2 != '' || this.leafletService.storeInformation.yellowBannerMainText3 != null || this.leafletService.storeInformation.yellowBannerMainText3 != undefined || this.leafletService.storeInformation.yellowBannerMainText2 != '') {
  
    fabric.Image.fromURL('../../assets/imgs/callout_star.svg', (img) => {
        img.scale(0.1) ;
        let banner = img;
        banner.set({
          left: 370,
          top: 5,
          angle: 0,
          padding: 10,
          cornerSize: 10,
          hasRotatingPoint: true
        }
        )
       // banner.scaleToWidth(120,false);
        banner.scaleToHeight(120,false);
       
        // banner.set({
        //   scaleX: 120 / img.width,
        //   scaleY: 120 / img.height
        // })
        this.extend(banner, 'header-banner');
        canvasTemp.add(banner);
        canvasTemp.sendToBack(banner);
        canvasTemp.renderAll();

        if (this.leafletService.storeInformation.yellowBannerMainText1 != null && this.leafletService.storeInformation.yellowBannerMainText1 != undefined && this.leafletService.storeInformation.yellowBannerMainText1 != '') {
          let yellowText1 = new fabric.Textbox(this.leafletService.storeInformation.yellowBannerMainText1, {
            left: 395,
            top: 40,
            width: 120,
            textAlign: 'center',
            fontFamily: 'Helvetica',
            angle: 0,
            fill: '#932B2A',
            fontWeight: 'bold',
            hasRotatingPoint: true,
            fontSize: 12,
           // fixedWidth: 120,
           isWrapping: true,
            lineHeight: 1,
          });

          this.extend(yellowText1, "yelloText1");
          canvasTemp.add(yellowText1);
          yellowText1.setCoords();
          canvasTemp.bringToFront(yellowText1);
          canvasTemp.renderAll();
        }

        if (this.leafletService.storeInformation.yellowBannerMainText2 != null && this.leafletService.storeInformation.yellowBannerMainText2 != undefined && this.leafletService.storeInformation.yellowBannerMainText2 != '') {
          let yellowText2 = new fabric.Textbox(this.leafletService.storeInformation.yellowBannerMainText2, {
            left: 395,
            top: 70,
            width: 120,
            textAlign: 'center',
            fontFamily: 'Helvetica',
            angle: 0,
            fill: '#932B2A',
            fontWeight: 'bold',
            hasRotatingPoint: true,
            fontSize: 10,
            // fixedWidth: 120,
            isWrapping: true,
            lineHeight: 1,
          });

          this.extend(yellowText2, "yellowText2");
          canvasTemp.add(yellowText2);
          yellowText2.setCoords();
          canvasTemp.bringToFront(yellowText2);
          canvasTemp.renderAll();
        }

        if (this.leafletService.storeInformation.yellowBannerMainText3 != null && this.leafletService.storeInformation.yellowBannerMainText3 != undefined && this.leafletService.storeInformation.yellowBannerMainText3 != '') {
          let yellowText3 = new fabric.Textbox(this.leafletService.storeInformation.yellowBannerMainText3, {
            left: 395,
            top: 80,
            width: 120,
            textAlign: 'center',
            fontFamily: 'Helvetica',
            angle: 0,
            fill: '#000000',
            fontWeight: 'bold',
            hasRotatingPoint: true,
            fontSize: 9,
            // fixedWidth: 120,
            isWrapping: true,
            lineHeight: 1,
          });

          this.extend(yellowText3, "yellowText3");
          canvasTemp.add(yellowText3);
          yellowText3.setCoords();
          canvasTemp.bringToFront(yellowText3);
          canvasTemp.renderAll();
        }
      })
    }
   
  }

  addFooterInfromation(canvasTemp) {
    if (this.leafletService.storeInformation.address != null && this.leafletService.storeInformation.address != undefined && this.leafletService.storeInformation.address != '') {
      let address = new fabric.Textbox(this.leafletService.storeInformation.address, {
        top: 10,
        left: 12,
        width: 250,
        height:40,
        textAlign: 'left',
        fontFamily: 'helvetica',
        angle: 0,
        fill: '#ffffff',
        fontWeight: 'bold',
        hasRotatingPoint: true,
        fontSize: 11,
        // fixedWidth: 250
        isWrapping: true
      });

      this.extend(address, "footer-address");
      canvasTemp.add(address);
      canvasTemp.renderAll();
    }

    if (this.leafletService.storeInformation.storeTimings != null && this.leafletService.storeInformation.storeTimings != undefined && this.leafletService.storeInformation.storeTimings != '') {
      let timingText = this.leafletService.storeInformation.storeTimings.replace('↵', '.');
      timingText = timingText.replace('\n', '.');

      let timing = new fabric.Textbox(this.leafletService.storeInformation.storeTimings, {
        top: 40,
        left: 12,
        width: 250,
        height:40,
        textAlign: 'left',
        fontFamily: 'helvetica',
        angle: 0,
        fill: '#FFED50',
        fontWeight: 'bold',
        hasRotatingPoint: true,
        fontSize: 11,
        // fixedWidth: 250
        isWrapping: true
      });

      this.extend(timing, "footer-timing");
      canvasTemp.add(timing);
      canvasTemp.renderAll();
    }

    let partition=new fabric.Line([0,100,0,0],{
      left:300,
      top:10,
      stroke:'white'
    })
    this.extend(partition, "footer-partition");
    canvasTemp.add(partition);
    canvasTemp.renderAll();

    if (this.leafletService.storeInformation.inhouseStoreImage != null && this.leafletService.storeInformation.inhouseStoreImage != undefined && this.leafletService.storeInformation.inhouseStoreImage != '') {
      let img = new Image();
      img.src = this.leafletService.storeInformation.inhouseStoreImage;
      let storeLogo1 = new fabric.Image(img, {
        left: 305,
        top: 10,
        angle: 0,
        padding: 10,
        cornerSize: 10,
        hasRotatingPoint: true
      });

      storeLogo1.scaleToHeight(30);
      this.extend(storeLogo1, 'footer-image');
      canvasTemp.add(storeLogo1);
      canvasTemp.renderAll();

      if (this.leafletService.storeInformation.inhouseStoreInfo != null && this.leafletService.storeInformation.inhouseStoreInfo != undefined && this.leafletService.storeInformation.inhouseStoreInfo != '') {
        let inhouseText = this.leafletService.storeInformation.inhouseStoreInfo;
        console.log("inhouseStoreInfo---",storeLogo1.width);
        // inhouseText = inhouseText.replace('\n', '.');
  
        let inhouseInfo = new fabric.Textbox(inhouseText, {
          top: 10,
          left: 400,
          width: 100,
          textAlign: 'center',
          fontFamily: 'helvetica',
          angle: 0,
          fill: '#ffffff',
          fontWeight: 'normal',
          hasRotatingPoint: true,
          fontSize: 11,
          // fixedWidth: 100
          isWrapping: true
        });
  
        this.extend(inhouseInfo, "footer-inhouseInfo");
        canvasTemp.add(inhouseInfo);
        canvasTemp.renderAll();
      }
    }
    if(this.leafletService.storeInformation.offerPeriod!=null && this.leafletService.storeInformation.offerPeriod!=undefined && this.leafletService.storeInformation.offerPeriod!=''){
      let offerText = this.leafletService.storeInformation.offerPeriod;
      // inhouseText = inhouseText.replace('\n', '.');

      let offerTextInfo = new fabric.Textbox('PRICES EFFECTIVE', {
        top: 53,
        left: 305,
        width: 120,
        textAlign: 'left',
        fontFamily: 'helvetica',
        angle: 0,
        fill: '#FFED50',
        fontWeight: 'bold',
        hasRotatingPoint: true,
        fontSize: 11,
        // fixedWidth: 120
        isWrapping: true
      });

      this.extend(offerTextInfo, "footer-offerTextInfo");
      canvasTemp.add(offerTextInfo);
      canvasTemp.renderAll();
      let offerTextVal = new fabric.Textbox(offerText, {
        top: 53,
        left: 400,
        width: 150,
        textAlign: 'center',
        fontFamily: 'helvetica',
        angle: 0,
        fill: '#ffffff',
        fontWeight: 'bold',
        hasRotatingPoint: true,
        fontSize: 11,
        // fixedWidth: 150
        isWrapping: true
      });

      this.extend(offerTextVal, "footer-offerTextVal");
      canvasTemp.add(offerTextVal);
      canvasTemp.renderAll();
    }

    if(this.leafletService.storeInformation.socialLinkTagLine!=null && this.leafletService.storeInformation.socialLinkTagLine!=undefined && this.leafletService.storeInformation.socialLinkTagLine!=''){
      fabric.Image.fromURL('../../assets/imgs/facebook-icon.svg', (img) => {
        img.scale(0.1) ;
        let fbicon = img;
        fbicon.set({
          left: 305,
          top: 70,
          angle: 0,
          padding: 10,
          cornerSize: 10,
          hasRotatingPoint: true,
        }
        )
        fbicon.scaleToHeight(25,false);
        this.extend(fbicon, 'footer-fbicon');
        canvasTemp.add(fbicon);
        canvasTemp.renderAll();
      })

      let socialLine = new fabric.Textbox(this.leafletService.storeInformation.socialLinkTagLine, {
        top: 70,
        left: 333,
        width: 250,
        textAlign: 'left',
        fontFamily: 'helvetica',
        angle: 0,
        fill: '#ffffff',
        fontWeight: 'bold',
        hasRotatingPoint: true,
        fontSize: 10,
        // strokeWidth: 1,
        // stroke: '#8ea7ef',
        // paintFirst: "stroke"
      });

      this.extend(socialLine, "footer-offerTextVal");
      canvasTemp.add(socialLine);
      canvasTemp.renderAll();
    }

  //  canvasTemp.renderAll();
  }

  addUsagePolicyInfo(canvasTemp){
    if (this.leafletService.storeInformation.usageRightsPolicyLine != null && this.leafletService.storeInformation.usageRightsPolicyLine != undefined && this.leafletService.storeInformation.usageRightsPolicyLine != '') {
      let usageText = this.leafletService.storeInformation.usageRightsPolicyLine.replace('↵', '.');
      usageText = usageText.replace('\n', '.');

      let usageFabric = new fabric.Textbox(usageText, {
        top: 10,
        left: 12,
        width: 400,
        textAlign: 'left',
        fontFamily: 'helvetica',
        angle: 0,
        fill: '#ffffff',
        fontWeight: 'normal',
        hasRotatingPoint: false,
        fontSize: 10,
        // fixedWidth: 400
        isWrapping: true
      });

      this.extend(usageFabric, "footer-usageFabric");
      canvasTemp.add(usageFabric);
    }
    canvasTemp.renderAll();
  }

  addItemsInformation(canvasId, canvasTemp: fabric.Canvas) {
    let pageNumber = canvasId.split('-')[2];
    let sectionNumber = canvasId.split('-')[4];
    let itemNumber = canvasId.split('-')[6];
    let brandText = this.leafletService.pageData[pageNumber].sections[sectionNumber].itemList[itemNumber].brandName;
    let productName = this.leafletService.pageData[pageNumber].sections[sectionNumber].itemList[itemNumber].description;
    let varieties = this.leafletService.pageData[pageNumber].sections[sectionNumber].itemList[itemNumber].varieties;
    let size = this.leafletService.pageData[pageNumber].sections[sectionNumber].itemList[itemNumber].size;
    let price = (this.leafletService.pageData[pageNumber].sections[sectionNumber].itemList[itemNumber].retail.value)
    let brand,product;
    if (brandText != null && brandText != undefined && brandText != '') {
       brand = new fabric.Textbox(brandText, {
        top: 5,
        left: 5,
        width: 130,
        // fixedWidth: 130,
        isWrapping: true,
        textAlign: 'left',
        fontFamily: 'Helvetica',
        angle: 0,
        fill: '#932B2A',
        fontWeight: 'bold',
        hasRotatingPoint: true,
        fontSize: 12,
        lineHeight: 1,
        charSpacing: 10,
      })
      this.extend(brand, canvasId + 'brand');
      canvasTemp.add(brand);
      canvasTemp.renderAll();
    }

    if (productName != null && productName != undefined && productName != '') {
       product = new fabric.Textbox(productName, {
        top:(brand==null || brand==undefined)?6: brand.height+6,
        left: 5,
        width: 130,
        // fixedWidth: 130,
        isWrapping: true,
        textAlign: 'left',
        fontFamily: 'Roboto',
        angle: 0,
        fill: '#000000',
        fontWeight: '900',
        hasRotatingPoint: true,
        fontSize: 12,
        lineHeight: 1,
       strokeWidth: 2,
      stroke: '#ffffff',
        paintFirst: "stroke",
        strokeUniform: true
      });
     
      //,
     
      this.extend(product, canvasId + 'product');
      canvasTemp.add(product);
      canvasTemp.renderAll();
    }

    if (varieties != null && varieties != undefined) {
      let allVarsAndSize = new fabric.Textbox(varieties, {
        top: ((brand==null || brand==undefined)?6 :brand.height)+((product==null || product==undefined)?6:product.height)+16,
        left: 5,
        width: 120,
        // fixedWidth: 120,
        isWrapping: true,
        textAlign: 'left',
        fontFamily: 'Roboto',
        angle: 0,
        fill: '#000000',
        fontWeight: 'normal',
        hasRotatingPoint: true,
        fontSize: 12,
        lineHeight: 1,
        strokeWidth: 2,
      //  strokeUniform: true,
        stroke: '#ffffff',
        paintFirst: "stroke"

      });
      this.extend(allVarsAndSize, canvasId + 'vars');
      canvasTemp.add(allVarsAndSize);
      canvasTemp.renderAll();

      let sizeVal = new fabric.Textbox(size, {
        top: brand.height+product.height+16,
        left: 45,
        width: 120,
        // fixedWidth: 120,
        isWrapping: true,
        textAlign: 'left',
        fontFamily: 'Roboto',
        angle: 0,
        fill: '#000000',
        fontWeight: 'normal',
        hasRotatingPoint: true,
        fontSize: 12,
        lineHeight: 1,
        strokeWidth: 2,
    //    strokeUniform: true,
        stroke: '#ffffff',
        paintFirst: "stroke"

      });
      this.extend(sizeVal, canvasId + 'itemsize');
      canvasTemp.add(sizeVal);
      canvasTemp.renderAll();
    }
    else{
      if(size!=null && size!=undefined && size!=''){
        let allVarsAndSize = new fabric.Textbox(size, {
          top: brand.height+product.height+16,
          left: 5,
          width: 120,
          // fixedWidth: 120,
          isWrapping: true,
          textAlign: 'left',
          fontFamily: 'Roboto',
          angle: 0,
          fill: '#000000',
          fontWeight: 'normal',
          hasRotatingPoint: true,
          fontSize: 12,
          lineHeight: 1,
          strokeWidth: 2,
       //   strokeUniform: true,
          stroke: '#ffffff',
          paintFirst: "stroke"
  
        });
        this.extend(allVarsAndSize, canvasId + 'itemsize');
        canvasTemp.add(allVarsAndSize);
        canvasTemp.renderAll();
      }
    }
    

    // let varietyText = ((varieties != null && varieties != undefined) ? varieties + '.' : '') + ((size != null && size != undefined) ? size : '');
    // if (varietyText != null && varietyText != undefined && varietyText != '') {
    //   let allVarsAndSize = new fabric.Textbox(varietyText, {
    //     top: 40,
    //     left: 5,
    //     width: 120,
    //     fixedWidth: 120,
    //     textAlign: 'left',
    //     fontFamily: 'Roboto',
    //     angle: 0,
    //     fill: '#000000',
    //     fontWeight: 'normal',
    //     hasRotatingPoint: true,
    //     fontSize: 12,
    //     lineHeight: 1,
    //     strokeWidth: 2,
    //     strokeUniform: true,
    //     stroke: '#ffffff',
    //     paintFirst: "stroke"

    //   });
    //   this.extend(allVarsAndSize, canvasId + 'allVarsAndSize');
    //   canvasTemp.add(allVarsAndSize);
    // }

    let shadow = new fabric.Shadow({
      color: 'rgba(0,0,0,0.25)',
      blur: 4,
      offsetY: 4,
      offsetX: 0
    });

    if (this.leafletService.pageData[pageNumber].sections[sectionNumber].itemList[itemNumber].retail.isLb != true && this.leafletService.pageData[pageNumber].sections[sectionNumber].itemList[itemNumber].retail.isFor != true && this.leafletService.pageData[pageNumber].sections[sectionNumber].itemList[itemNumber].retail.value.toLowerCase().trim() == 'price to follow') {
      let textTemp = price;
      if (textTemp != null && textTemp != undefined && textTemp != '') {
        let priceText = new fabric.Textbox(textTemp, {
          top: 70,
          left: 2,
          textAlign: 'left',
          angle: 0,
          width: 120,
          // fixedWidth: 120,
          isWrapping: true,
          fill: '#CE0200',
          fontWeight: 'bold',
          hasRotatingPoint: true,
          fontSize: 14,
          lineHeight: 1,
          shadow: shadow,
          paintFirst: "stroke",
          strokeWidth: 4,
      //  strokeUniform: true,
          stroke: '#ffffff',
          fontFamily: 'Helvetica'
        });
      
        this.extend(priceText, canvasId + 'price');
        canvasTemp.add(priceText);
        priceText.set('fontFamily','Helvetica');
        canvasTemp.renderAll();
      }
    }
    else
      if (this.leafletService.pageData[pageNumber].sections[sectionNumber].itemList[itemNumber].retail.isLb == true) {
        if (price != null && price != undefined && price != '') {
          // let textTemp = '$' + price + 'lb.';
          // let lbIndex = textTemp.indexOf('lb.');
          //add dollar
          let dollar = new fabric.Textbox('$', {
            top: 68,
            left: 5,
            textAlign: 'left',
            fontSize: 16,
            fontWeight: 'bold',
            strokeWidth: 4,
            strokeUniform: true,
            stroke: '#ffffff',
            angle: 0,
            fill: '#CE0200',
            hasRotatingPoint: true,
            lineHeight: 1,
            paintFirst: "stroke",
            shadow: shadow,
            fontFamily: 'Helvetica'
          });
          this.extend(dollar, canvasId + 'dollar');
          canvasTemp.add(dollar);
          canvasTemp.renderAll();
          //add price
          let priceText = new fabric.Textbox(price, {
            top: 70,
            left: dollar.width+10,
            textAlign: 'left',
            fontSize: 20,
            fontWeight: 'bold',
            strokeWidth: 4,
            strokeUniform: true,
            stroke: '#ffffff',
            angle: 0,
            fill: '#CE0200',
            hasRotatingPoint: true,
            lineHeight: 1,
            paintFirst: "stroke",
            shadow: shadow,
            fontFamily: 'Helvetica'
          });
          this.extend(priceText, canvasId + 'pricetext');
          canvasTemp.add(priceText);
          canvasTemp.renderAll();
          //add lb.
          let lb = new fabric.Textbox('lb.', {
            top: 80,
            left: dollar.width+priceText.width+15,
            textAlign: 'left',
            fontSize: 14,
            fontWeight: 'bold',
            strokeWidth: 4,
            strokeUniform: true,
            stroke: '#ffffff',
            angle: 0,
            fill: '#CE0200',
            hasRotatingPoint: true,
            lineHeight: 1,
            paintFirst: "stroke",
            shadow: shadow,
            fontFamily: 'Helvetica'
          });
          this.extend(lb, canvasId + 'unit');
          canvasTemp.add(lb);
          canvasTemp.renderAll();
        }
      }
      else
      if (this.leafletService.pageData[pageNumber].sections[sectionNumber].itemList[itemNumber].retail.isEach == true) {
        if (price != null && price != undefined && price != '') {
          // let textTemp = '$' + price + 'lb.';
          // let lbIndex = textTemp.indexOf('lb.');
          //add dollar
          let dollar = new fabric.Textbox('$', {
            top: 68,
            left: 5,
            textAlign: 'left',
            fontSize: 16,
            fontWeight: 'bold',
            strokeWidth: 4,
            strokeUniform: true,
            stroke: '#ffffff',
            angle: 0,
            fill: '#CE0200',
            hasRotatingPoint: true,
            lineHeight: 1,
            paintFirst: "stroke",
            shadow: shadow,
            fontFamily: 'Helvetica',
          });
          this.extend(dollar, canvasId + 'dollar-each');
          canvasTemp.add(dollar);
          canvasTemp.renderAll();
          //add price
          let priceText = new fabric.Textbox(price, {
            top: 70,
            left: dollar.width+10,
            textAlign: 'left',
            fontSize: 20,
            fontWeight: 'bold',
            strokeWidth: 4,
            strokeUniform: true,
            stroke: '#ffffff',
            angle: 0,
            fill: '#CE0200',
            hasRotatingPoint: true,
            lineHeight: 1,
            paintFirst: "stroke",
            shadow: shadow,
            fontFamily: 'Helvetica',
          });
          this.extend(priceText, canvasId + 'pricetext-each');
          canvasTemp.add(priceText);
          canvasTemp.renderAll();
          //add lb.
          let lb = new fabric.Textbox('each', {
            top: 80,
            left: dollar.width+priceText.width+15,
            textAlign: 'left',
            fontSize: 14,
            fontWeight: 'bold',
            strokeWidth: 4,
            strokeUniform: true,
            stroke: '#ffffff',
            angle: 0,
            fill: '#CE0200',
            hasRotatingPoint: true,
            lineHeight: 1,
            paintFirst: "stroke",
            shadow: shadow,
            fontFamily: 'Helvetica',
          });
          this.extend(lb, canvasId + 'unit-each');
          canvasTemp.add(lb);
          canvasTemp.renderAll();
        }
      }
      else if (this.leafletService.pageData[pageNumber].sections[sectionNumber].itemList[itemNumber].retail.isFor == true) {
        if (price != null && price != undefined && price != '') {
          //add count
          let count=this.leafletService.pageData[pageNumber].sections[sectionNumber].itemList[itemNumber].retail.count+'/';
          let countText = new fabric.Textbox(count, {
            top: 70,
            left: 5,
            textAlign: 'left',
            fontSize: 20,
            fontWeight: 'bold',
            strokeWidth: 4,
            strokeUniform: true,
            stroke: '#ffffff',
            angle: 0,
            fill: '#CE0200',
            hasRotatingPoint: true,
            lineHeight: 1,
            paintFirst: "stroke",
            shadow: shadow,
            fontFamily: 'Helvetica'
          });
          this.extend(countText, canvasId + 'counttext');
          canvasTemp.add(countText);
          canvasTemp.renderAll();
          //add dollar
          let dollarText = new fabric.Textbox('$', {
            top: 68,
            left: countText.width+5,
            textAlign: 'left',
            fontSize: 16,
            fontWeight: 'bold',
            strokeWidth: 4,
            strokeUniform: true,
            stroke: '#ffffff',
            angle: 0,
            fill: '#CE0200',
            hasRotatingPoint: true,
            lineHeight: 1,
            paintFirst: "stroke",
            shadow: shadow,
            fontFamily: 'Helvetica'
          });
          this.extend(dollarText, canvasId + 'dollartext');
          canvasTemp.add(dollarText);
          canvasTemp.renderAll();
          //add price

          // let textTemp = this.leafletService.pageData[pageNumber].sections[sectionNumber].itemList[itemNumber].retail.count + '/$' + price;
          // let dollarIndex = textTemp.indexOf('$');
          let priceText = new fabric.Textbox(price, {
            top: 70,
            left: countText.width+dollarText.width+10,
            textAlign: 'left',
            fontSize: 20,
            fontWeight: 'bold',
            strokeWidth: 4,
            strokeUniform: true,
            stroke: '#ffffff',
            angle: 0,
            fill: '#CE0200',
            hasRotatingPoint: true,
            lineHeight: 1,
            paintFirst: "stroke",
            shadow: shadow,
            fontFamily: 'Helvetica'
          });
          this.extend(priceText, canvasId + 'price');
          //priceText.setSelectionStyles('superscript', dollarIndex, dollarIndex + 1).setSuperscript(dollarIndex, dollarIndex + 1);
          canvasTemp.add(priceText);
          canvasTemp.renderAll();
        }
      }
      else {
        if (price != null && price != undefined && price != '') {
          let dollarText = new fabric.Textbox('$', {
            top: 68,
            left: 5,
            textAlign: 'left',
            fontSize: 16,
            fontWeight: 'bold',
            strokeWidth: 4,
            strokeUniform: true,
            stroke: '#ffffff',
            angle: 0,
            fill: '#CE0200',
            hasRotatingPoint: true,
            lineHeight: 1,
            paintFirst: "stroke",
            shadow: shadow,
            fontFamily: 'Helvetica'
          });
          this.extend(dollarText, canvasId + 'dollartext');
          canvasTemp.add(dollarText);
          canvasTemp.renderAll();

          let priceText = new fabric.Textbox(price, {
            top: 70,
            left: dollarText.width+5,
            textAlign: 'left',
            fontSize: 23,
            fontWeight: 'bold',
            strokeWidth: 4,
            strokeUniform: true,
            stroke: '#ffffff',
            angle: 0,
            fill: '#CE0200',
            hasRotatingPoint: true,
            lineHeight: 1,
            paintFirst: "stroke",
            shadow: shadow,
            fontFamily: 'Helvetica',
          });
          this.extend(priceText, canvasId + 'price');
       //   priceText.setSelectionStyles('superscript', 0, 1).setSuperscript(0, 1);
          canvasTemp.add(priceText);
          canvasTemp.renderAll();
        }
      }
    //canvasTemp.renderAll();
  }

  addSectionInformation(canvasId, canvasTemp: fabric.Canvas) {
    let pageNumber = canvasId.split('-')[1];
    let sectionNumber = canvasId.split('-')[4];
    let mainHeading = this.leafletService.pageData[pageNumber].sections[sectionNumber].name;
    let subHeading1 = this.leafletService.pageData[pageNumber].sections[sectionNumber].subHeading1;
    let subHeading2 = this.leafletService.pageData[pageNumber].sections[sectionNumber].subHeading2;

    if (mainHeading != null && mainHeading != undefined && mainHeading != '' && mainHeading.toLowerCase().trim() != 'na' && mainHeading.toLowerCase().trim() != 'n/a') {
      let mainhead = new fabric.Textbox(mainHeading, {
        top: 10,
        left: 100,
        textAlign: 'center',
        fontFamily: 'Smythe',
        angle: 0,
        fill: '#ffffff',
        fontWeight: 'bold',
        hasRotatingPoint: true,
        fontSize: 30,
        width: 300,
        // fixedWidth: 300,
        isWrapping: true,
        lineHeight: 1,
        strokeWidth: 3,
        strokeUniform: true,
        stroke: '#000000',
        paintFirst: "stroke"
      });
      this.extend(mainhead, canvasId + 'mainhead');
      canvasTemp.add(mainhead);
      canvasTemp.centerObjectH(mainhead);
      canvasTemp.centerObjectV(mainhead);
      mainhead.setCoords();
      canvasTemp.renderAll();
    }
    let shadow = new fabric.Shadow({
      color: 'rgba(0,0,0,0.25)',
      blur: 4,
      offsetY: 4,
      offsetX: 0
    });
    if (subHeading1 != null && subHeading1 != undefined && subHeading1 != '' && subHeading1.toLowerCase().trim() != 'na' && subHeading1.toLowerCase().trim() != 'n/a') {
      let subhead1 = new fabric.Textbox(subHeading1, {
        top: 10,
        left: 12,
        textAlign: 'center',
        fontFamily: 'helvetica',
        angle: -15,
        fill: '#ffffff',
        fontWeight: 'bold',
        hasRotatingPoint: true,
        fontSize: 12,
        width: 100,
        // fixedWidth: 100,
        isWrapping: true,
        shadow: shadow
      });
      this.extend(subhead1, canvasId + 'subhead1');
      canvasTemp.add(subhead1);
      canvasTemp.centerObjectV(subhead1);
      subhead1.setCoords();
      canvasTemp.renderAll();
    }

    if (subHeading2 != null && subHeading2 != undefined && subHeading2 != '' && subHeading2.toLowerCase().trim() != 'na' && subHeading2.toLowerCase().trim() != 'n/a') {
      let subhead2 = new fabric.Textbox(subHeading2, {
        left: 460,
        textAlign: 'center',
        fontFamily: 'helvetica',
        angle: 15,
        fill: '#ffffff',
        fontWeight: 'bold',
        hasRotatingPoint: true,
        fontSize: 12,
        width: 100,
        // fixedWidth: 100,
        isWrapping: true,
        shadow: shadow
      });
      this.extend(subhead2, canvasId + 'subhead2');
      canvasTemp.add(subhead2);
      canvasTemp.centerObjectV(subhead2);
      subhead2.setCoords();
      canvasTemp.renderAll();
    }
   // canvasTemp.renderAll();
  }

  addImageToCanvas(canvasId, canvasTemp: fabric.Canvas, imageBase64String) {
    let img = new Image();
    img.src = imageBase64String;
    let storeLogo = new fabric.Image(img, {
      left: 20,
      top: 10,
      angle: 0,
      padding: 10,
      cornerSize: 10,
      hasRotatingPoint: true
    });
    storeLogo.scaleToWidth(100);
    storeLogo.scaleToHeight(80);
    this.extend(storeLogo, canvasId + '-image');
    canvasTemp.add(storeLogo);
    canvasTemp.sendToBack(storeLogo);
    canvasTemp.renderAll();
  }

  extend(obj, id) {
    obj.toObject = ((toObject) => {
      return function () {
        return fabric.util.object.extend(toObject.call(this), {
          id
        });
      };
    })(obj.toObject);
  }

  initDragOfDiv(event, idOfParent) {
    console.log("idOfParent----", idOfParent);
    this.selectedDiv = document.getElementById(idOfParent);
    this.startY = event.clientY;
    this.startHeight = parseInt(document.defaultView.getComputedStyle(this.selectedDiv).height, 10);
  }

  stopDragEvent(event) {
    console.log("STOP THIS----");
    this.selectedDiv = null;
    this.startY = null;
  }

  public getHeightOfEachItem(numberOfItems) {
    let numberOfRows = this.numberOfRows[(numberOfItems)];
    return 'calc(' + (100 / numberOfRows) + '% - (' + numberOfRows + '* 10px))';
  }

  resizeInnerCanvasElements() {
    console.log("final list number of keys----", Object.keys(this.canavsList));
    console.log("final list----", this.selectedDiv);
    return new Promise((resolve, reject) => {
      let count = 0;
      Object.keys(this.canavsList).forEach(canvasObject => {
        let tempid = canvasObject.split('-canvas')[0];
        // console.log("xtempid-----", tempid);
        let width = document.getElementById(tempid).clientWidth;
        let height = document.getElementById(tempid).clientHeight;
        this.canavsList[(canvasObject)].setWidth(width);
        this.canavsList[(canvasObject)].setHeight(height);
        this.canavsList[(canvasObject)].renderAll();
        if (count == Object.keys(this.canavsList).length - 1) {
          resolve();
        }
        count++;
      })
    })

  }

  downloadImage() {
    this.isPrinting = true;
    this.cleanSelect().then(() => {
      console.log(this.screens);
      let count = 0;
      this.screens.forEach((element, index) => {
        
        html2canvas.default
          (element.nativeElement, { ignoreElements: (el) => { return el.classList.contains('drag-control-bottom') }, scale: 6.2 }).then(canvas => {
            console.log(canvas.toDataURL());
            console.log("index----", index);
            //this.createThumbnail(canvas.toDataURL(), 3508, 4960).then(data => {
            setTimeout(() => {
              this.canvas.nativeElement.src = canvas.toDataURL();
              this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
              this.downloadLink.nativeElement.download = 'marble-diagram' + (index + 1) + '.png';
              this.downloadLink.nativeElement.click();
              if (count >= this.screens.length - 1) {
                setTimeout(() => {
                  // this.isPrinting = false;
                  this.chngeDetectorRef.detectChanges();
                }, 200);
              }
              count++;
            }, 200);
            //})
          })
        // .then(exportDone => {
        //   console.log("export done===");
        // });
      })
    })
  }

  createThumbnail(imageBase64, width, height): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log(imageBase64);
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      let img = new Image();
      img.src = imageBase64;

      // return { width: srcWidth*ratio, height: srcHeight*ratio };
      img.onload = () => {
        var ratio = Math.min(width / img.width, height / img.height);

        console.log("IMAGE WIDTH---", img.width);
        console.log("IMAGE HEIGHT---", img.height);
        // width: srcWidth*ratio, height: srcHeight*ratio
        canvas.height = img.height * ratio;
        canvas.width = img.width * ratio;
        ctx.drawImage(img, 0, 0, img.width * ratio, img.height * ratio);
        let newImageData = canvas.toDataURL();
        let strImage = newImageData.replace(/^data:image\/[a-z]+;base64,/, "");
        resolve(strImage);
        // let newImageData=canvas.toBlob((blob)=>{
        //   console.log(blob);
        //   resolve(blob);
        // });
      }
    })
  }

  public dropped(files: NgxFileDropEntry[]) {

    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          if (file.type.toLowerCase() == 'image/png' || file.type.toLowerCase() == 'image/jpg' || file.type.toLowerCase() == 'image/jpeg' || file.type.toLowerCase() == 'image/svg' || file.type.toLowerCase() == 'image/gif') {
            // this.filesfiles;
            let that = this;
            console.log(droppedFile.relativePath, file);
            let reader = new FileReader();
            reader.onload = function (event) {
              that.productImages.push(event.target.result.toString());
              console.log(" that.productImages---", that.productImages);
              that.chngeDetectorRef.detectChanges();
            };
            reader.readAsDataURL(file);
          }
        });
      } else {

      }
    }
  }

  public fileOver(event) {
    console.log("file over");
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  public getImage(url) {
    return this.domSanitizer.bypassSecurityTrustStyle("url('" + url + "')")
  }

  public productImageDropped(event) {
    console.log("dropped---", event);
    console.log("dropped---", event);

  }

  dragStart(event) {
    this.chngeDetectorRef.detach();
  }

  dragEnd(event) {
    this.chngeDetectorRef.reattach();
  }

  onDrop(event, idOnDrop) {
    console.log("DROP DATA---", event, idOnDrop);
    let pageNumber = idOnDrop.split('-')[2];
    let sectionNumber = idOnDrop.split('-')[4];
    let itemNumber = idOnDrop.split('-')[6];
    let canvasObj = this.canavsList[(idOnDrop + '-canvas')];
    let images = canvasObj.getObjects('image');
    if (images != null && images != undefined && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        canvasObj.remove(images[i]);
        if (i == images.length - 1) {
          this.addImageToCanvas(idOnDrop, canvasObj, event.dropData);
        }
      }
    }
    else {
      this.addImageToCanvas(idOnDrop, canvasObj, event.dropData);
    }
  }

  cleanSelect() {
    return new Promise((resolve, reject) => {
      Object.keys(this.canavsList).forEach((canvasObject, index) => {
        this.canavsList[(canvasObject)].discardActiveObject().renderAll();
        if (index == Object.keys(this.canavsList).length - 1) {
          resolve();
        }
      })
    })

  }

  deleteObject(){
    Object.keys(this.canavsList).forEach((canvasObject, index) => {
      if (canvasObject == this.selectedObjectInCanvasId + '-canvas') {
        let activeObject = this.canavsList[(canvasObject)].getActiveObject();
        console.log("activeObject----",activeObject.type);
          if(activeObject.type=='image'){
            this.canavsList[(canvasObject)].remove(activeObject);
          }
      }
    })
  }
  // downloadImage() {
  //   this.screens.forEach((element, index) => {
  //     // Save original size of element
  //     var originalWidth = element.nativeElement.offsetWidth;
  //     var originalHeight = element.nativeElement.offsetHeight;
  //     // Force px size (no %, EMs, etc)
  //     element.nativeElement.style.width = originalWidth + "px";
  //     element.nativeElement.style.height = originalHeight + "px";

  //     // Position the element at the top left of the document because of bugs in html2canvas. The bug exists when supplying a custom canvas, and offsets the rendering on the custom canvas based on the offset of the source element on the page; thus the source element MUST be at 0, 0.
  //     // See html2canvas issues #790, #820, #893, #922
  //     element.nativeElement.style.position = "absolute";
  //     element.nativeElement.style.top = "0";
  //     element.nativeElement.style.left = "0";

  //     // Create scaled canvas
  //     var scaledCanvas = document.createElement("canvas");
  //     scaledCanvas.width = originalWidth * 6.2;
  //     scaledCanvas.height = originalHeight * 6.2;
  //     scaledCanvas.style.width = originalWidth + "px";
  //     scaledCanvas.style.height = originalHeight + "px";
  //     var scaledContext = scaledCanvas.getContext("2d");
  //     scaledContext.scale(6.2, 6.2);
  //     html2canvas.default
  //       (element.nativeElement).then(canvas1 => {
  //         console.log(canvas1.toDataURL());
  //         //   destIMG.src = canvas.toDataURL("image/png");
  //         // srcEl.style.display = "none";
  //         this.downloadLink.nativeElement.href = canvas1.toDataURL('image/png');
  //         this.downloadLink.nativeElement.download = 'marble-diagram' + (index + 1) + '.png';
  //         this.downloadLink.nativeElement.click();
  //         // this.createThumbnail(canvas.toDataURL(), 3508, 4960).then(data => {
  //         //   this.canvas.nativeElement.src = data;
  //         //   this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
  //         //   this.downloadLink.nativeElement.download = 'marble-diagram' + (index + 1) + '.png';
  //         //   this.downloadLink.nativeElement.click();
  //         //   if (index >= this.screens.length - 1) {
  //         //     setTimeout(() => {
  //         //       this.isPrinting = false;
  //         //       this.chngeDetectorRef.detectChanges();
  //         //     }, 200);
  //         //   }
  //         // })

  //       }).then(exportDone => {
  //         console.log("export done===");
  //       });
  //   })

  // }

  // createThumbnail(imageBase64, width, height): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     console.log(imageBase64);
  //     let canvas = document.createElement("canvas");
  //     let ctx = canvas.getContext("2d");
  //     let img = new Image();
  //     img.src = imageBase64;

  //     // return { width: srcWidth*ratio, height: srcHeight*ratio };
  //     img.onload = () => {
  //       var ratio = Math.min(width / img.width, height / img.height);

  //       console.log("IMAGE WIDTH---", img.width);
  //       console.log("IMAGE HEIGHT---", img.height);
  //       // width: srcWidth*ratio, height: srcHeight*ratio
  //       canvas.height = img.height * ratio;
  //       canvas.width = img.width * ratio;
  //       ctx.drawImage(img, 0, 0, img.width * ratio, img.height * ratio);
  //       let newImageData = canvas.toDataURL();
  //       let strImage = newImageData.replace(/^data:image\/[a-z]+;base64,/, "");
  //       resolve(strImage);
  //       // let newImageData=canvas.toBlob((blob)=>{
  //       //   console.log(blob);
  //       //   resolve(blob);
  //       // });
  //     }
  //   })
  // }
  changeBackground(bg,index){
    console.log(bg);
    this.currentBackgroundSelected=index;
    for(let i=0;i<this.leafletService.pageData.length;i++){
      switch(bg.type){
        case 'color':{
          document.getElementById(i.toString()).style.backgroundColor=bg.code;
          document.getElementById(i.toString()).style.backgroundImage='none';
          break;
        }
        case 'gradient':{
          document.getElementById(i.toString()).style.backgroundImage=bg.code;
          document.getElementById(i.toString()).style.backgroundPosition='center'
          break;
        }
        case 'pattern':{
          document.getElementById(i.toString()).style.backgroundColor=bg.backgroundColor;
          document.getElementById(i.toString()).style.backgroundImage='url(\''+bg.backgroundImage+'\')';
          document.getElementById(i.toString()).style.backgroundPosition=bg.backgroundPosition;
          document.getElementById(i.toString()).style.backgroundRepeat=bg.backgroundRepeat;
          //if(bg.backgroundRepeat=='no-repeat')
          document.getElementById(i.toString()).style.backgroundSize=bg.backgroundSize;
          // else
          // document.getElementById(i.toString()).style.backgroundSize='auto';
          break;
        }
      }
     
    }
   
  }
}
