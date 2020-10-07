import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class IconBuilder implements ComponentFramework.StandardControl<IInputs, IOutputs> {


	private _container: HTMLDivElement;
	
	private _fa_classname: string;
	private _fontsize: number;
	private _iconsize: number;
	private _fontcolor: string;
	private _title: string;
	private _notifycount: number;
	private _notibubblecolor: string;

	private i_div_element: HTMLDivElement;
	private i_element: HTMLElement;
	private label_element: HTMLLabelElement;
	private noti_span_element: HTMLSpanElement;

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
		this._container = document.createElement("div");
		this.i_div_element = document.createElement("div");
		this.i_element = document.createElement("i");
		this.label_element = document.createElement("label");
		this.noti_span_element = document.createElement("span");

		// retrieve manifest inputs
		this._fa_classname = context.parameters.fontAwesomeClassName.formatted ? context.parameters.fontAwesomeClassName.formatted : "fa fa-home";
		this._iconsize = context.parameters.iconSize.raw ? context.parameters.iconSize.raw : 40;
		this._fontsize = context.parameters.fontSize.raw ? context.parameters.fontSize.raw : 12;
		this._fontcolor = context.parameters.fontColor.raw ? context.parameters.fontColor.raw : "#A7A7A7";
		this._title = context.parameters.title.raw ? context.parameters.title.raw : "Sample";
		this._notifycount = context.parameters.notiCount.raw ? context.parameters.notiCount.raw : 0;
		this._notibubblecolor = context.parameters.notiBubbleColor.raw ? context.parameters.notiBubbleColor.raw : "green";
		

		// set span (notification)
		this.noti_span_element.innerHTML = this._notifycount.toString();
		if (this._notifycount > 0){
			this.noti_span_element.setAttribute("style", "position:absolute;background-color:"+this._notibubblecolor+";padding: 2px 5px 2px 6px;color: white;font-size: 0.65em;border-radius: 50%;box-shadow: 1px 1px 1px gray;display:inline;")
		 }else{
			this.noti_span_element.setAttribute("style", "position:absolute;background-color:"+this._notibubblecolor+";padding: 2px 5px 2px 6px;color: white;font-size: 0.65em;border-radius: 50%;box-shadow: 1px 1px 1px gray;display:none;")
		 }

		this.i_div_element.appendChild(this.noti_span_element)

		// set i element (icon)
		this.i_element.setAttribute("class", this._fa_classname);		
		this.i_element.setAttribute("style", "font-size: " + this._iconsize + "px; color: " + this._fontcolor);		
		this.i_div_element.appendChild(this.i_element);
		


		this._container.appendChild(this.i_div_element);

		// set a element (title)
		this.label_element.innerHTML = this._title;
		this.label_element.setAttribute("style", "text-align: center; font-size: " + this._fontsize + "px; color: " + this._fontcolor);				
		this._container.appendChild(this.label_element);


		container.appendChild(this._container);

		// Add the FontAwesome Stylesheet
		var link = document.createElement("link");
		link.id = "FontAwesomeURL";
		link.rel = "stylesheet";
		link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
	
		// Add the request on the head of the document
		document.getElementsByTagName("head")[0].appendChild(link);
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		 // Add code to update control view
		 this._fa_classname = context.parameters.fontAwesomeClassName.formatted ? context.parameters.fontAwesomeClassName.formatted : "fa fa-home";		 
		 this._iconsize = context.parameters.iconSize.raw ? context.parameters.iconSize.raw : 40;
		 this._fontsize = context.parameters.fontSize.raw ? context.parameters.fontSize.raw : 12;
		 this._fontcolor = context.parameters.fontColor.raw ? context.parameters.fontColor.raw : "#A7A7A7";
		 this._title = context.parameters.title.raw ? context.parameters.title.raw : "Sample";
		 this._notifycount = context.parameters.notiCount.raw ? context.parameters.notiCount.raw : 0;
		 this._notibubblecolor = context.parameters.notiBubbleColor.raw ? context.parameters.notiBubbleColor.raw : "green";
		 
		 // val is the default when debugging
		 
		 this.i_element.setAttribute("class", this._fa_classname);			   
		 this.i_element.setAttribute("style", "font-size: " + this._iconsize + "px; color: " + this._fontcolor);			   	 		
		 this.label_element.innerHTML = this._title;
	     this.label_element.setAttribute("style", "text-align: center; font-size: " + this._fontsize + "px; color: " + this._fontcolor);		

		 // set notification bubble
		 this.noti_span_element.innerHTML = this._notifycount.toString();
		 if (this._notifycount > 0){
			this.noti_span_element.setAttribute("style", "position:absolute;background-color:"+this._notibubblecolor+";padding: 2px 5px 2px 6px;color: white;font-size: 0.65em;border-radius: 50%;box-shadow: 1px 1px 1px gray;display:inline;")
		 }else{
			this.noti_span_element.setAttribute("style", "position:absolute;background-color:"+this._notibubblecolor+";padding: 2px 5px 2px 6px;color: white;font-size: 0.65em;border-radius: 50%;box-shadow: 1px 1px 1px gray;display:none;")
		 }
		 
		
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