wp.blocks.registerBlockType('mailrelay/mailrelay-wpforms', {
	title: 'Mailrelay forms',
	category: 'widgets',
	icon: 'email',
	description: 'Select and display one of your forms.',
	attributes: {
		form_id: {
			type: 'integer',
			default: null
		}
	},
	keywords: ['mailrelay'],
	edit: (props) => {
		var form_id = props.attributes.form_id;
		var all_forms = mailrelay_wpforms_forms.forms;
		var all_options = [{label: 'Select a Form', value: 0}];
		for(var i=0;i<all_forms.length;i++) {
			all_options.push({label: all_forms[i].name, value: all_forms[i].id});
		}

		// Change this to return the a div with two children:
		//
		//  1) The select element below but inside InspectorControls
		//  2) Another div with wp.element.RawHTML containing the embedded_form_code ( see save method ) but only if user already selected a form
		
		return wp.element.createElement('div', { className: 'wpforms-gutenberg-form-selector-wrap'},
			wp.element.createElement(wp.components.SelectControl,
				{
					value: form_id,
					options: all_options,
					onChange: function( value ) {
						props.setAttributes({ form_id: value });
					}
				}
			)
		);
	
	},
	save: function( props ) {
		// Only required on save
    let blockProps = wp.blockEditor.useBlockProps.save()

    let selected_form = mailrelay_wpforms_forms.forms.find(function(v) { return v.id === props.attributes.form_id })
    if (!selected_form) {
    	return
    }

    return wp.element.createElement( 'div', blockProps, wp.element.RawHTML( { children: selected_form.embedded_form_code } ) );
	},
});