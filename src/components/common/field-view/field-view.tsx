import { Component, Prop } from "@stencil/core";

@Component({
	tag: 'field-view',
	styleUrl: 'field-view.css'
})
export class FieldView {
	@Prop() key: string = ''
	@Prop() value: string = ''
	@Prop() valueColor: string = 'black'
	
	render() {
		return (
			<div class='root'>
				<div class='title'>{this.key}</div>
				<div class='value' style={{'color': this.valueColor}}>{this.value}</div>
			</div>
		)
	}
}