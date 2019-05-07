import {IInputs, IOutputs} from "./generated/ManifestTypes";
import * as mt from "mousetrap";
import { isNullOrUndefined } from "util";
import { isContext } from "vm";

/**
 * This PCF control uses the Mousetrap library: https://craig.is/killing/mice
 * 
 * 	For modifier keys you can use shift, ctrl, alt, or meta.
 *   You can substitute option for alt and command for meta.
 *	Other special keys are backspace, tab, enter, return, capslock, esc, escape, space, pageup, pagedown, end, home, left, up, right, down, ins, del, and plus.
 */
export class KeybindingExample implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	// value of our field is stored to this variable
	private _value: string;
	private _previousvalue: string;

	// PCF framework to notify of changes
	private _notifyOutputChanged: () => void;

	// We want an input field for number value
	private inputElement : HTMLInputElement;

	// We want a container to store all the elements
	private _container: HTMLDivElement;	

	// Event handler 'refreshData' reference
	private _refreshData: EventListenerOrEventListenerObject;


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
	 * @param container If a control is marked control-type='starndard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{							

		this._container = document.createElement("div");
		this._notifyOutputChanged = notifyOutputChanged;
		this._refreshData = this.refreshData.bind(this);
		

		// create the input element
		this.inputElement = document.createElement("input");
		this.inputElement.setAttribute("type","text");			
		this.inputElement.addEventListener("input", this._refreshData) ;
		this._container.append(this.inputElement);

		// append this to the param container
		container.appendChild(this._container);
	}


	/**
	 * Action to perform once key is pressed.  This can be a web service call, an action, a pop up or whatever.
	 */
	public actionToPerformOnKeypress(){		
		alert("An action is performed.");
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		
		// Add code to update control view
		//this.refreshData();		
	}


	/** Refresh our inputvalue for harness
	 * 
	 */
	public refreshData() {
		
		this._previousvalue = this._value;
		this._value = this.inputElement.value;		
		this._notifyOutputChanged();

		// check that the bind key has a value
		if ( !isNullOrUndefined(this._value) && (this._value != "") )
		{
			
			// unbind previous value
			if ( !isNullOrUndefined(this._previousvalue) && (this._previousvalue != "") ){
				mt.unbind( this._previousvalue );
			}

			// Add control initialization code
			//alert("bound for glory - " + this._value);  // for debug purposes
			mt.bind( this._value, this.actionToPerformOnKeypress );		
		}

		
	}


	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {			
			keybindLetterOrSequence: this._value
		}
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{		
		// Add code to cleanup control if necessary
		this.inputElement.removeEventListener("onblur", this._refreshData) ;
	}
}