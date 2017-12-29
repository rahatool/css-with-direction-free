/**
 * @file Direction-free CSS
 * @author Mahdi NezaratiZadeh <mahdi.nezarati@gmail.com>
 * @since 2017-07-25
 * @version 1.0.0
 * @copyright Mahdi NezaratiZadeh 2017
 */
window.MyCSS = {
	/**
	 * Preferences variables
	 * @public
	 */
	direction: 'rtl',
	
	/**
	 * Internal variable for keeping reference of injected-style
	 * @private
	 */
	_stylesheet: null,

	/**
	 * Keeping unprocessed-rules
	 * @private
	 */
	_queue: [],

	/**
	 * Keeping processed-rules
	 * @private
	 */
	_rules: [],

	/**
	 * Caution! It is called only one-time when DOM is ready.
	 */
	start() {
		let stylesheet = document.createElement('style');
		document.head.append(stylesheet);
		this._stylesheet = stylesheet.sheet;

		// Checking queue for finding unadded-rules
		for (let item of this._queue) {
			if(item.type == true)
			{
				var inner_code="";
				for(item_sub in item.properties)
				{
					inner_code+=item_sub+"{";
					inner_code+=this._addRuleHelper(item.properties[item_sub]);
					inner_code+="}";
				}
				this.AddingRule(item.selector,inner_code);
			}
			else
			{
				this.AddingRule(item.selector,this._addRuleHelper(item.properties));
			}
		}
	},

	/**
	 * @param {String} selector - The selector of the rule
	 * @param {Object} properties - The body of the rule; name of property can be based on Camel case or Dashed-separated.
	 * @returns {Number} The position of added-rule
	 * @example
	 * MyCSS.addRule('body > p', {
	 *		'font-size': {rtl: '16px', ltr: '12px'},
	 *		marginStart: '10px',
	 * })
	 */
	addRule(selector, properties) {
		// Checking state of DOM
		if (this._stylesheet == null) {
			// If the DOM is not ready, the rule is queued.
			var type;
			//if(selector.trim().startsWith("@"))
			if(selector.startsWith("@"))
			{
				type=true;
				this._queue.push({
					type,
					selector,
					properties,
				});
			}
			else
			{
				type=false;
				this._queue.push({
					type,
					selector,
					properties,
				});
			}
			return -1;
		} else {
			// If the DOM is ready, the rule is processed.
			return this.AddingRule(this._addRuleHelper(selector, properties));
		}
	},

	/**
	 * Batch processing
	 * @example
	 * 	MyCSS.rules = {
	 *		selector-1: {
	 *			declaration
	 * 		},
	 * 		selector-n: {
	 *			declaration
	 * 		},
	 * 	}
	 */
	set rules(value) {
		for (let selector in value) {
			this.addRule(selector, value[selector]);
		}
	},

	/**
	 * Clearing set of rules
	 */
	clear() {
		let position = this._stylesheet.rules.length;
		while (position > 0) {
			position -= 1;
			this._stylesheet.deleteRule(position);
		}
		
		this._rules = [];
	},




	AddingRule(selector,declaration)
	{
		// Cross-browser algorithm for adding rule
		let stylesheet = this._stylesheet;
		if (stylesheet.insertRule) {
			var inner_code=`${selector} {
				${declaration}
			}`;
			//console.log(inner_code);
			return stylesheet.insertRule(inner_code, stylesheet.rules.length);
		} else if (stylesheet.addRule) {
			return stylesheet.addRule(stylesheet, declaration);
		} else {
			throw new Error('X_0');
		}
	},




	/**
	 * @description The fundamental base of my dissertation starts from below
	 * @throw {Error} Browser is not supported
 	 * @param String selector
	 * @param Object properties
	 */

	_addRuleHelper(properties) {
		// Finding correct direction
		let directions = {
			rtl: {
				start: 'right',
				end: 'left',
			},
			ltr: {
				start: 'left',
				end: 'right',
			}
		};
		let direction = directions[this.direction];

		// Processing properties
		let declaration = [];
		for (let name in properties) {
			let value = properties[name];
			name = name.replace(/([A-Z])/g, function(all) {
				return '-' + all.toLowerCase();
			});
			switch (name) {
				case 'float':
				case 'clear':
					if (value == 'start') {
						value == direction.start;
					} else if (value == 'end') {
						value == direction.end;
					}
					break;
				
				case 'text-shadow':
					if (this.direction == 'ltr') {
						break;
					}

					value = value.replace(/^(.*?)\s+(.*?)\s+/, function(all, x, y) {
						return `calc(-1 * ${x}) calc(-1 * ${y}) `;
					});
					break;
				
				case 'background-position':
					if (this.direction == 'ltr') {
						break;
					}

					let [x, y] = value.split(/\s+/);
					if (y) {
						value = `calc(100% - ${x}) ${y}`;
					} else {
						value = `calc(100% - ${x}) ${x}`;
					}
					break;
				case 'background-position-start':
					if (this.direction == 'ltr') {
						break;
					}

					name = 'background-position-x';
					value = `calc(100% - ${value})`;
					break;
				
				case 'border-start':
					name = `border-${direction.start}`;
					break;
				case 'border-start-color':
					name = `border-${direction.start}-color`;
					break;
				case 'border-start-style':
					name = `border-${direction.start}-style`;
					break;
				case 'border-start-width':
					name = `border-${direction.start}-width`;
					break;
				
				case 'border-end':
					name = `border-${direction.end}`;
					break;
				case 'border-end-color':
					name = `border-${direction.end}-color`;
					break;
				case 'border-end-style':
					name = `border-${direction.end}-style`;
					break;
				case 'border-end-width':
					name = `border-${direction.end}-width`;
					break;
				
				case 'border-bottom-start-radius':
					name = `border-bottom-${direction.start}-radius`;
					break;
				case 'border-bottom-end-radius':
					name = `border-bottom-${direction.end}-radius`;
					break;
				
				case 'border-top-start-radius':
					name = `border-top-${direction.start}-radius`;
					break;
				case 'border-top-end-radius':
					name = `border-top-${direction.end}-radius`;
					break;
				
				case 'padding-start':
					name = `padding-${direction.start}`;
					break;
				case 'padding-end':
					name = `padding-${direction.end}`;
					break;
				
				case 'margin-start':
					name = `margin-${direction.start}`;
					break;
				case 'margin-end':
					name = `margin-${direction.end}`;
					break;

				case 'text-align':
				case 'text-align-last':
					if (value == 'start') {
						value == direction.start;
					} else if (value == 'end') {
						value == direction.end;
					}
					break;
				
				case 'box-shadow':
					if (this.direction == 'ltr') {
						break;
					}
					
					value = value.replace(/^(.*?)\s+(.*?)\s+/, function(all, x, y) {
						return `calc(-1 * ${x}) calc(-1 * ${y}) `;
					});
					break;

				case 'font-size':
				case 'font-family':
				case 'line-height':
					if (value.constructor == Object) {
						value = value[this.direction];
					} else {
						// using static value of property
					}
					break;

				case 'marquee-direction':
					if (value == 'start') {
						value == direction.start;
					} else if (value == 'end') {
						value == direction.end;
					}
					break;

				// position properties
				case 'start':
					name = direction.start;
					break;
				case 'end':
					name = direction.end;
					break;

			}
			declaration.push(`${name}:${value}`);
		}
		declaration = declaration.join(';');
		return declaration;
	},
};

// Registering event for DOM ready state
document.addEventListener('DOMContentLoaded', function() {
	// Initializing the direction of document
	MyCSS.addRule(':root', {
		direction: MyCSS.direction,
	});

	// processing style rules
	MyCSS.start();
});
