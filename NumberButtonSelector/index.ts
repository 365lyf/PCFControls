import {IInputs, IOutputs} from "./generated/ManifestTypes";
import { debug } from "util";
import { timingSafeEqual } from "crypto";

export class NumberButtonSelector implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _incrementValue: number;

	// value of our field is stored to this variable
	private _value: number;

	// PCF framework to notify of changes
	private _notifyOutputChanged: () => void;

	// We want an input field for number value
	private inputElement : HTMLInputElement;

	// We want minus and plus buttons
	private minusButtonElement : HTMLButtonElement;
	private plusButtonElement : HTMLButtonElement;
	
	// We want a container to store all the elements
	private _container: HTMLDivElement;

	// Reference to PCF Context object
	private _context: ComponentFramework.Context<IInputs>;

	// Event handler 'refreshData' reference
	private _refreshData: EventListenerOrEventListenerObject;
	private _increment: EventListenerOrEventListenerObject;
	private _decrement: EventListenerOrEventListenerObject;




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
		// set our increment value (later we'll parameterize this)
		this._incrementValue = 1;


		// Add control initialization code
		this._context = context;
		this._container = document.createElement("div");
		this._notifyOutputChanged = notifyOutputChanged;
		this._refreshData = this.refreshData.bind(this);

		// create the input element
		this.inputElement = document.createElement("input");
		this.inputElement.setAttribute("type","number");			
		this.inputElement.addEventListener("input", this._refreshData) ;

		// create the min button
		this.minusButtonElement = document.createElement("button");
		this.minusButtonElement.setAttribute("type", "button");
		this.minusButtonElement.innerText = "-";
		this._decrement = this.decrement.bind(this);
		this.minusButtonElement.addEventListener("click", this._decrement);

		// create the plus button
		this.plusButtonElement = document.createElement("button");
		this.plusButtonElement.setAttribute("type", "button");
		this.plusButtonElement.innerText = "+";
		this._increment = this.increment.bind(this);
		this.plusButtonElement.addEventListener("click", this._increment );


		// append everything to the div
		this._container.append(this.inputElement);
		this._container.append(this.minusButtonElement);
		this._container.append(this.plusButtonElement);

		// append this to the param container
		container.appendChild(this._container);
	}


	public increment( ) 
	{
		let inputvalue = parseInt( this.inputElement.value as any) ;

		if( !isNaN(inputvalue) ){
			this.inputElement.value = (inputvalue + this._incrementValue).toString( );	
		}

		this.refreshData();
	}

	public decrement( ) 
	{
		let inputvalue = parseInt( this.inputElement.value as any);
		
		if( !isNaN(inputvalue) ){
			this.inputElement.value = (inputvalue - this._incrementValue).toString( );	
		}
		
		this.refreshData();
	}

	public refreshData() {
				
		this._value = (this.inputElement.value as any) as number;		
		this._notifyOutputChanged();
		
	}

	

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
		this._context = context;
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {
			numberInputValue: this._value
		}
		
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
		this.minusButtonElement.removeEventListener("click", this._refreshData);
		this.plusButtonElement.removeEventListener("click", this._refreshData);
		
	}
}