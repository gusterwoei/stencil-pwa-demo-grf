import { Component, Prop, Listen, State } from "@stencil/core";
import { RouterHistory } from '@stencil/router';

@Component({
	tag: 'app-toolbar',
	styleUrl: 'app-toolbar.css'
})
export class AppToolbar {
	@Prop() router: RouterHistory
	@Prop() visible: boolean = true

	onBackPressed() {
		if (!this.router) return;
		this.router.goBack()
	}

	render() {
		return (
			<header style={{'visibility': this.visible ? 'visible' : 'hidden'}}>
				{/* <div class='d-flex flex-row justify-content-center'> */}
				<div class='row'>
					<stencil-route-link url='/' exact={true}>
					<div class='col valign-wrapper toolbar'>
						{/* <p onClick={() => this.onBackPressed()}><i class='fa fa-arrow-left' /></p> */}
						<img src='../../assets/icon/app_icon.png' width='50' height='50' />
						<span>Git Finder</span>
					</div>
					</stencil-route-link>
					{/* <div class='col s8'>
						<img src='../../assets/icon/app_icon.png' width='50' height='50' />
					</div>
					<div class='col s2'></div> */}
				</div>
			</header>
		)
	}
}