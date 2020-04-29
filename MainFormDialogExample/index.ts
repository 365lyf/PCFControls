import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class MainFormDialog implements ComponentFramework.StandardControl<IInputs, IOutputs> {


    /**
	 * Main Form Dialog Test from PCF.
	 * 
	 * 
	 * Dependencies.
	 * npm install --save @types/xrm
	 */


	private aDiv: HTMLDivElement;
	private _notifyOutputChanged: () => void;
	private aButton: HTMLButtonElement;

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
		context.mode.trackContainerResize(true);
		this._notifyOutputChanged = notifyOutputChanged;

		// Create main table container div. 
		this.aDiv = document.createElement("div");
		this.aDiv.setAttribute("id","outercontainer");

		this.aButton = document.createElement("button");
		this.aButton.innerText = "Open Main Form";
		this.aButton.addEventListener("click", this.mainFormOpen) ;

		this.aDiv.appendChild(this.aButton);
		container.appendChild(this.aDiv);
		

	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
	
		
	}

	public mainFormOpen(){

		//alert("Hello");
		
		let pageTypeStr = "entityrecord" as const;
		let navigationOptionTargetInt = 2 as const;
		let navigationOptionUnit = "%" as const;
		let navigationOptionPosition = 1 as const;

		// Add code to update control view
		var  pageInput = {
			pageType: pageTypeStr,
			entityName: "account",
			formType: 2,
		};
		var  navigationOptions = {
			target: navigationOptionTargetInt,
			width: {value: 70, unit: navigationOptionUnit},
			position: navigationOptionPosition
		};
		Xrm.Navigation.navigateTo(pageInput, navigationOptions);

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