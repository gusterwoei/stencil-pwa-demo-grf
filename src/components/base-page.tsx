import { Component, Event, EventEmitter } from "@stencil/core";

@Component({
	tag: 'base-page'
})
export abstract class BasePage {
	@Event() showToolbarEvent: EventEmitter
	
	componentWillLoad() {
		this.showToolbarEvent.emit()
	}
}