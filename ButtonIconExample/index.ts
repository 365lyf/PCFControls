import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class ButtonIconExample implements ComponentFramework.StandardControl<IInputs, IOutputs> {


	// Define Standard container element
	private _container: HTMLDivElement;
	

	// Define Display Elements
	private _blueButton: HTMLButtonElement;
	private _pinkButton: HTMLButtonElement;
	private _greenButton: HTMLButtonElement;


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
		// define standard control elements
		this._container = document.createElement("div");

		// define display controls
		this._blueButton = document.createElement("button");
		this._pinkButton = document.createElement("button");
		this._greenButton = document.createElement("button");

		// set class
		this._blueButton.setAttribute("class", "btn blue");
		this._pinkButton.setAttribute("class", "btn pink");
		this._greenButton.setAttribute("class", "btn green");

		this._blueButton.innerHTML = "<span class='fas fa-microphone-alt'></span> Start Recording";
		this._pinkButton.innerHTML = "<span class='fas fa-stop'></span> Stop";
		this._greenButton.innerHTML = "<span class='fas fa-plus'></span> Add to Meeting Notes";
		
	
		// add control elements to the div
		this._container.appendChild( this._blueButton );
		this._container.appendChild( this._pinkButton );
		this._container.appendChild( this._greenButton );

     	// Add control initialization code
		container.appendChild( this._container );
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
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