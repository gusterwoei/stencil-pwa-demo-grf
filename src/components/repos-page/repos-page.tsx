import { Component, State, Prop } from '@stencil/core'
import { Repo } from '../../common/repo';
import { RouterHistory } from '@stencil/router';
import { BasePage } from '../base-page';

@Component({
	tag: 'repos-page',
	styleUrl: 'repos-page.css'
})
export class ReposPage extends BasePage {
	@Prop() history: RouterHistory;
	@State() mData: Repo[] = [];
	@State() mError: string;
	@State() mIsLoading: boolean = false;

	mSearchText: string;

	componentWillLoad() {
		super.componentWillLoad()
	}

	getReposFromApi(developer: string) {
		this.mIsLoading = true
		fetch('https://api.github.com/users/' + developer + '/repos').then(response => {
			this.mIsLoading = false
			if (response.status != 200) {
				this.mData = []
				return;
			}

			response.json().then(data => {
				this.mData = data
			})
		})
	}

	onItemClick(item: Repo) {
		// window.location.href = item.html_url
		this.history.push("/repo-info/" + item.owner.login + '/' + item.name, {})
	}

	searchRepo() {
		if (!this.mSearchText) {
			this.mError = 'The field is required'
			return;
		}

		this.mError = ''
		this.getReposFromApi(this.mSearchText)
	}

	onSearchInput(event) {
		let value = event.target.value
		this.mSearchText = value ? value.trim() : value
	}

	render() {
		return [
			<div class='container'>
				<div class='form-group'>
					<input class='form-control' type='text' placeholder='Search Developers'
						onKeyDown={(e) => {
							if (e.code != 'Enter') return;
							this.searchRepo()
						}}
						onInput={(event) => this.onSearchInput(event)}>
					</input>

					{
						// error message
						!this.mError || this.mError.trim() == '' ?
							<div /> :
							<p class="error-text">{this.mError}</p>
					}

					<button class='btn waves-effect full-width' onClick={() => this.searchRepo()}>Search</button>
				</div>

				{ 
					// progress bar
					this.mIsLoading ?
					<div class='full-width mt'>
						<progress-bar></progress-bar>
					</div>
					: <div/>
				}

				{
					//  data
					this.mData.length == 0 && this.mSearchText ?
						<p>No repository found for {this.mSearchText}</p> :

						// returned repositories
						this.mData.map((item) =>
							<div class='card padding' onClick={() => this.onItemClick(item)}>
								<div class='row'>
									<div class='col s2'>
										<img src={item.owner.avatar_url} width='50' height='50' />
									</div>
									<div class='col s9 ml wrap-text'>
										<b>{item.name}</b>
										<p><a href={item.html_url}>{item.html_url}</a></p>
									</div>
								</div>
								<div class='row'>{item.description}</div>
							</div>
						)
				}
			</div>
		]
	}
}