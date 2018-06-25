import { Component, Prop, State } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import { Repo } from '../../common/repo';
import { License } from '../../common/license';

@Component({
	tag: 'repo-detail-page',
	styleUrl: 'repo-detail-page.css'
})
export class RepoDetailPage {
	@Prop() match: MatchResults
	@State() mRepo: Repo
	@State() mLicence: License

	componentWillLoad() {
		let owner = this.match.params.owner
		let repo = this.match.params.repo
		fetch('https://api.github.com/repos/' + owner + '/' + repo).then(response => {
			if (response.status != 200) {
				this.mRepo = null
				return;
			}

			response.json().then(data => {
				this.mRepo = data

				// get license
				if(!this.mRepo.license || !this.mRepo.license.url) return;

				fetch(this.mRepo.license.url).then(response => {
					if (response.status != 200) return;

					response.json().then(data => this.mLicence = data)
				})
			})
		})
	}

	render() {
		return [
			<app-toolbar/>,
			<div class='container'>
				{
					this.mRepo ?
						<div>
							<div class='row p-2'>
								<img src={this.mRepo.owner.avatar_url} width='50' height='50' />
								<div class='col-9'>
									<b>{this.mRepo.name}</b>
								</div>
								<a class='mt-3' href={this.mRepo.html_url}>{this.mRepo.html_url}</a>
							</div>
							<div>{this.mRepo.description}</div>

							{
								this.mLicence ?
								<div class='mt-5'>
									<h3>{this.mLicence.name}</h3>
									{this.mLicence.body}
								</div>
								:
								<div/>
							}
						</div>
						: <div />
				}
			</div>
		]
	}
}
