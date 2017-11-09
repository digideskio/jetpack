/** @format */
/**
 * WordPress dependencies
 */
const { PanelBody } = wp.components;
const { __ } = wp.i18n;
const { createClass } = wp.element;

/**
 * Internal dependencies
 */
const { registerBlockType, source, InspectorControls, BlockDescription } = wp.blocks;
const { ToggleControl, SelectControl } = InspectorControls;
const { text } = source;

const availableCurrencies = [
	{ value: 'US', label: 'USD', symbol: '$' },
	{ value: 'CA', label: 'CAD', symbol: '$' },
	{ value: 'EU', label: 'EUR', symbol: '€' },
];

const getCurrencySymbol = value => availableCurrencies.find( item => item.value === value ).symbol;

registerBlockType( 'jetpack/simple-payments-button', {
	title: 'Payment Button',

	icon: 'cart',

	category: 'widgets',

	attributes: {
		price: {
			type: 'number',
			default: 1,
		},
		currency: {
			type: 'string',
			default: 'US',
		},
		showIcons: {
			type: 'boolean',
			default: true,
		},
		multiple: {
			type: 'boolean',
			default: false,
		},
	},

	edit: createClass( {
		render() {
			const { className, attributes, setAttributes } = this.props;
			const { price, currency, showIcons, multiple } = attributes;

			const updatePrice = ( { target: { value } } ) => setAttributes( { price: value } );

			const updateCurrency = value => setAttributes( { currency: value } );

			const toggleShowIcons = () => setAttributes( { showIcons: ! showIcons } );

			const toggleMultiple = () => setAttributes( { multiple: ! multiple } );

			return [
				focus &&
					<InspectorControls key="inspector">
						<BlockDescription>
							<p>
								{ __(
									'A payment button. Sell tickets, collect donations, accept tips, and more.'
								) }
							</p>
						</BlockDescription>
						<PanelBody title={ __( 'Payment button settings' ) }>
							<SelectControl
								label={ __( 'Currency' ) }
								options={ availableCurrencies }
								onChange={ updateCurrency }
							/>
							<ToggleControl
								label={ __( 'Show credit card icons' ) }
								checked={ showIcons }
								onChange={ toggleShowIcons }
							/>
							<ToggleControl
								label={ __( 'Allow multiple items' ) }
								checked={ multiple }
								onChange={ toggleMultiple }
							/>
						</PanelBody>
					</InspectorControls>,
				<div className={ className }>
					<div class="jetpack-simple-payments jetpack-simple-payments-wrapper">
						<div class="jetpack-simple-payments-product">
							<div class="jetpack-simple-payments-details">
								<div class="jetpack-simple-payments-price">
									<p>
										{ getCurrencySymbol( currency ) }
										<input type="number" onChange={ updatePrice } value={ price } />
									</p>
								</div>
								<div class="jetpack-simple-payments-purchase-box">
									{ multiple &&
										<div class="jetpack-simple-payments-items">
											<input
												class="jetpack-simple-payments-items-number"
												type="number"
												placeholder="1"
												disabled={ true }
											/>
										</div> }
									<div class="jetpack-simple-payments-button">
										<div className="paypal-button">Pay with</div>

										{ showIcons &&
											<div className="payment-options">
												<div className="visa" />
												<div className="mastercard" />
												<div className="amex" />
												<div className="discover" />
											</div> }
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>,
			];
		},
	} ),

	save() {
		return null;
	},
} );