import { Component, Prop, State, Event, EventEmitter } from '@stencil/core';
import { MatchResults, RouterHistory } from '@stencil/router';
import { Repo } from '../../common/repo';
import { License } from '../../common/license';
import { BasePage } from '../base-page';

@Component({
	tag: 'repo-detail-page',
	styleUrl: 'repo-detail-page.css'
})
export class RepoDetailPage extends BasePage {
	@Prop() history: RouterHistory
	@Prop() match: MatchResults
	@State() mRepo: Repo
	@State() mLicence: License

	componentWillLoad() {
		super.componentWillLoad()
		let owner = this.match.params.owner
		let repo = this.match.params.repo

		let url = 'https://api.github.com/repos/' + encodeURI(owner) + '/' + encodeURI(repo)
		console.log(url)
		fetch(url).then(response => {
			if (response.status != 200) {
				this.mRepo = null
				return;
			}

			response.json().then(data => {
				this.mRepo = data

				// get license
				if (!this.mRepo.license || !this.mRepo.license.url) return;

				fetch(this.mRepo.license.url).then(response => {
					if (response.status != 200) return;

					response.json().then(data => this.mLicence = data)
				})
			})
		})
	}

	render() {
		return [
			<div class='container'>
				{
					this.mRepo ?
						<div>
							{/* details */}
							<div class='card padding'>
								<div class='row'>
									<div class='col'>
										<img src={this.mRepo.owner.avatar_url} width='50' height='50' />
									</div>
									<div class='col s9'>
										<b>{this.mRepo.name}</b>
									</div>
								</div>
								<a class='mt-3' href={this.mRepo.html_url}>{this.mRepo.html_url}</a>
								<div>{this.mRepo.description}</div>
							</div>

							{/* license */}
							{
								this.mLicence ?
									<div class='mt-5'>
										<h5>{this.mLicence.name}</h5>
										{this.mLicence.body}
									</div>
									:
									<div />
							}
						</div>
						: <div />
				}
			</div>
		]
	}
}
