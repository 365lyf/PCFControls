import {IInputs, IOutputs} from "./generated/ManifestTypes";

import * as jquery from 'jquery';
import { ThHTMLAttributes } from "react";


enum direction {
	Up = "Up",
	Down = "Down",
	Left = "Left",
	Right = "Right"
}

export class Swipe implements ComponentFramework.StandardControl<IInputs, IOutputs> {


	private xDown : number | null;
	private yDown : number | null;
	private touchDirection : string | null;
	private swipeDistance : number | null;
	private startX : number | null;
	private startY : number | null;
	private windowHeight : number;
	private windowWidth : number;
	private detectionPixelDistance : number;
	private startFromEdge : boolean;

	private _handleTouchStart : EventListenerOrEventListenerObject;
	private _handleTouchMove : EventListenerOrEventListenerObject;

	private _notifyOutputChanged: () => void;

	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		// Add control initialization code
		this._handleTouchStart = this.handleTouchStart.bind(this);
		this._handleTouchMove = this.handleTouchMove.bind(this);

		this._notifyOutputChanged = notifyOutputChanged;

		this.windowHeight = window.innerHeight;
		this.windowWidth = window.innerWidth;
		this.detectionPixelDistance = 200;
		

		document.addEventListener('touchstart', this._handleTouchStart);        
		document.addEventListener('touchmove', this._handleTouchMove);

	}
                                                  
                           

	private handleTouchStart(event: Event) {

		var te = <TouchEvent>event;

		var firstTouch = te.touches[0];
		this.xDown = firstTouch.clientX;                                      
		this.yDown = firstTouch.clientY;     
		
		this.startX = this.xDown;
		this.startY = this.yDown;

	}                                  
	  
	private handleTouchMove(evt: Event): void{
		if ( ! this.xDown || ! this.yDown ) {
			return;
		}

		var te = <TouchEvent>evt;
	
		var xUp = te.touches[0].clientX;                                    
		var yUp = te.touches[0].clientY;
	
		var xDiff = this.xDown - xUp;
		var yDiff = this.yDown - yUp;
	
		if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/

			this.swipeDistance = xDiff;
			if ( xDiff > 0 ) {
				/* left swipe */ 			   
			   this.touchDirection = direction.Left;
			} else {
				/* right swipe */				
				this.touchDirection = direction.Right;
			}                       
		} else {

			this.swipeDistance = yDiff;
			
			if ( yDiff > 0 ) {
				/* up swipe */
				this.touchDirection = direction.Up;
			} else { 
				/* down swipe */
				this.touchDirection = direction.Down;
			}                                                                 
		}

		//this.consoleOut();       
		this._notifyOutputChanged();

		/* reset values */
		this.xDown = null;
		this.yDown = null;       
		this.swipeDistance = null;
		                               
  }


	private consoleOut() : void{
		/*
		console.log("Start Coordinates - X : " + this.startX + ", Y : " + this.startY);
		console.log("Window Size - Width : " + this.windowWidth + ", Height : " + this.windowHeight);

		console.log("Direction : " + this.touchDirection);
		console.log("Distance : " + this.swipeDistance);
*/

		if (this.startY && this.startX){

			switch ( this.touchDirection ){
				case direction.Down : 
					if( this.startY < this.detectionPixelDistance ){ console.log ("Started from Top"); } break;
				case direction.Up : 
					if( this.startY > (this.windowHeight - this.detectionPixelDistance) ){ console.log ("Started from Bottom" ); } break;
				case direction.Right :
					if( this.startX < this.detectionPixelDistance ){ console.log ("Started from the Left" ); } break;
				case direction.Left :
					if( this.startX > (this.windowWidth - this.detectionPixelDistance) ){ console.log ("Started from the Right"); } break;
				default:
					break;

			}
		}

	}

	


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view		
		this.startFromEdge = context.parameters.startFromEdge.raw;		
		this.windowHeight = window.innerHeight;
		this.windowWidth = window.innerWidth;
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		var outDownSwipe : boolean = false;
		var outUpSwipe : boolean = false;
		var outLeftSwipe : boolean = false;
		var outRightSwipe : boolean = false;
		var outWindowHeightDetected = this.windowHeight;
		var outWindowWidthDetected = this.windowWidth;
		var outxStartDetected =  this.startX;
		var outyStartDetected = this.startY;


		if (this.startY && this.startX){
			if (this.startFromEdge){
				
				switch ( this.touchDirection ){
					case direction.Down : 
						if( this.startY < this.detectionPixelDistance ){ outDownSwipe = true; } break;
					case direction.Up : 
						if( this.startY > (this.windowHeight - this.detectionPixelDistance) ){ outUpSwipe = true; } break;
					case direction.Right :
						if( this.startX < this.detectionPixelDistance ){ outRightSwipe = true; } break;
					case direction.Left :
						if( this.startX > (this.windowWidth - this.detectionPixelDistance) ){ outLeftSwipe = true; } break;
					default:
						break;

				}
				
			}else{
			
				switch ( this.touchDirection ){
					case direction.Down : 
						outDownSwipe = true;  break;
					case direction.Up : 
						outUpSwipe = true; break;
					case direction.Right :
						outRightSwipe = true;  break;
					case direction.Left :
						outLeftSwipe = true; break;
					default:
						break;

				}
			}
		}
		/*
		console.log(this.windowWidth);
		console.log("start x " + this.startX);
*/
		return {			
			downSwipe: outDownSwipe,
			upSwipe: outUpSwipe,
			leftSwipe: outLeftSwipe,
			rightSwipe: outRightSwipe,
			windowHeightDetected: <number>outWindowHeightDetected,
			windowWidthDetected: <number>outWindowWidthDetected,
			xStartDetected: <number>outxStartDetected,
			yStartDetected: <number>outyStartDetected			
		};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}
}