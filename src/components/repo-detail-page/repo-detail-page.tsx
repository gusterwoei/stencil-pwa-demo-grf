import { Component, Prop, State } from '@stencil/core';
import { MatchResults, RouterHistory } from '@stencil/router';
import { Repo } from '../../common/repo';
import { License } from '../../common/license';
import { BasePage } from '../base-page';
import { Commit } from '../../common/commit';

@Component({
	tag: 'repo-detail-page',
	styleUrl: 'repo-detail-page.css'
})
export class RepoDetailPage extends BasePage {
	@Prop() history: RouterHistory
	@Prop() match: MatchResults
	@State() mRepo: Repo
	@State() mLicence: License
	@State() mCommits: Commit[] = [];

	componentWillLoad() {
		super.componentWillLoad()
		this.loadRepoDetail()
		this.loadLastCommit()
	}

	private loadRepoDetail() {
		let owner = this.match.params.owner
		let repo = this.match.params.repo

		let url = `https://api.github.com/repos/${encodeURI(owner)}/${encodeURI(repo)}`
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

	private loadLastCommit() {
		let owner = this.match.params.owner
		let repo = this.match.params.repo

		let url = `https://api.github.com/repos/${encodeURI(owner)}/${encodeURI(repo)}/commits`
		fetch(url).then(response => {
			if(response.status != 200) {
				this.mCommits = []
				return;
			}

			response.json().then(data => {
				data.forEach((item) => {
					let obj = Object.assign(new Commit(), item)
					this.mCommits.push(obj)
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
									<div class='col'>
										<div>{this.mRepo.description}</div>
									</div>
								</div>

								{/* other details */}
								<div class='row'>
									<div class='col s4'>
										<field-view key='Language' value={this.mRepo.language} />
									</div>
									<div class='col s4'>
										<field-view key='Watchers' value={this.mRepo.watchers_count + ''} />
									</div>
									<div class='col s4'>
										<field-view key='Issues' value={this.mRepo.open_issues_count + ''} valueColor='red' />
									</div>
								</div>

								<div>
									<span class='field-title'>Last Commit:</span> &nbsp;
									<span class='field-value'>
										{this.mCommits && this.mCommits.length > 0 ? this.mCommits[0].getLastCommitDate() : ''}
									</span>
								</div>

								{/* hyperlink */}
								<a class='mt-3' href={this.mRepo.html_url}>{this.mRepo.html_url}</a>
							</div>

							{/* license */}
							{
								this.mLicence ?
									<div class='mt-5'>
										<h5>{this.mLicence.name}</h5>
										<div class='tnc'>{this.mLicence.body}</div>
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
