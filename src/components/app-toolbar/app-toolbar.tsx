import { Component } from "@stencil/core";

@Component({
	tag: 'app-toolbar',
	styleUrl: 'app-toolbar.css'
})
export class AppToolbar {

	render() {
		return (
			<header>
				<div class='d-flex flex-row justify-content-center'>
					<img src='../../assets/icon/app_icon.png' width='50' height='50' />
				</div>
			</header>
		)
	}
}