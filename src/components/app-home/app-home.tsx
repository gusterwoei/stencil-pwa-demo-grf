import { Component } from '@stencil/core';


@Component({
	tag: 'app-home',
	styleUrl: 'app-home.css'
})
export class AppHome {

	render() {
		return (
			<div class='app-home'>
				<div class='container content-root'>
					<img src='assets/icon/app_icon.png' alt='app icon' />
					<p>Github Repository Finder</p>

					<stencil-route-link url='/repos'>
						<button type='button' class='btn btn-primary'>Getting Started</button>
					</stencil-route-link>
				</div>
			</div>
		);
	}
}
