import { Component, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

@Component({
	tag: 'app-root',
	styleUrl: 'app-root.css'
})
export class AppRoot {
	@Prop() history: RouterHistory

	render() {
		return (
			<div>
				<main>
					<stencil-router>
						<stencil-route url='/' component='app-home' exact={true}></stencil-route>
						<stencil-route url='/repos' component='repos-page' exact={true}></stencil-route>
						<stencil-route url='/repos/:owner/:repo' component='repo-detail-page'></stencil-route>
						{/* <stencil-route url='/profile/:name' component='app-profile'></stencil-route> */}
					</stencil-router>
				</main>
			</div>
		);
	}
}
