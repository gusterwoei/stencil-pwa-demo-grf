import { Component, Listen, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

@Component({
	tag: 'app-home',
	styleUrl: 'app-home.css'
})
export class AppHome {
	@Prop() history: RouterHistory

	componentDidLoad() {
		// clear caches
		if (window.sessionStorage) window.sessionStorage.clear()
	}

	render() {
		return (
			<div class='app-home'>
				<div class='container content-root'>
					<img src='assets/icon/app_icon.png' alt='app icon' />
					<p><b>Github Repository Finder</b></p>
					<p>A PWA demo project with Stencil</p>

					{/* <stencil-route-link url='/repos'>
						<button type='button' class='btn btn-primary waves-effect'>Getting Started</button>
					</stencil-route-link> */}
					<button type='button' class='btn btn-primary waves-effect' onClick={() => {
						this.history.push('/repos')
					}}>Getting Started</button>
				</div>
			</div>
		);
	}
}
