import { Component, OnInit, ViewEncapsulation, HostListener, ChangeDetectorRef, ViewChild, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { fabric }  from 'fabric'
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-generate-page',
  templateUrl: './generate-page.component.html',
  styleUrls: ['./generate-page.component.scss']
})

export class GeneratePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.currentPage = 0;
    // this.changeTabToThis(this.currentPage);
    this.productImages = [];
  }

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
}