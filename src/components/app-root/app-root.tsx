import { Component, Prop, Listen, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

@Component({
	tag: 'app-root',
	styleUrl: 'app-root.css'
})
export class AppRoot {
	@Prop() history: RouterHistory
	@State() mShowToolbar: boolean = false;

	@Listen('showToolbarEvent')
	handleShowToolbarEvent(event: CustomEvent) {
		this.mShowToolbar = true
	}

	componentWillLoad() {
		// listening to back button pressed
		window.addEventListener('popstate', (event) => {
			let url = window.location.pathname
			this.mShowToolbar = url.trim() != '/'
		})
	}

	render() {
		// materialcss initializes dropdown
		let elems = document.querySelectorAll('select');
		if (window['M'])
			window['M'].FormSelect.init(elems);
	
		return (
			<div>
				<app-toolbar visible={this.mShowToolbar} />
				<main>
					<stencil-router>
						{/* use the exact version for stencil-router ie. (^0.2.2) instead of latest, the current latest might not be stable and is subjected to errors */}
						{/* <stencil-route-switch scrollTopOffset={0}> */}
							<stencil-route url="/" component="app-home" exact={true}></stencil-route>
							<stencil-route url="/repos" component="repos-page" exact={false}></stencil-route>
							<stencil-route url="/repo-detail/:owner/:repo" component="repo-detail-page" exact={false}></stencil-route>
							{/* <stencil-route component="repos-page"></stencil-route> */}
						{/* </stencil-route-switch> */}
					</stencil-router>
				</main>
			</div>
		);
	}
}
