import { Component, State, Prop } from '@stencil/core'
// import 'whatwg-fetch'
import { Repo } from '../../common/repo';
import { RouterHistory } from '@stencil/router';

@Component({
	tag: 'repos-page',
	styleUrl: 'repos-page.css'
})
export class ReposPage {
	@Prop() history: RouterHistory;
	@State() mData: Repo[] = [];
	@State() mError: string;

	mSearchText: string;

	componentWillLoad() {
		
	}

	getReposFromApi(developer: string) {
		fetch('https://api.github.com/users/' + developer + '/repos').then(response => {
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
		this.history.push("/repos/" + item.owner.login + '/' + item.name, {})
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
			<app-toolbar/>,
			<div class='container padding'>
				<div class='form-group'>
					<input
						class='form-control'
						type='text'
						placeholder='Search Developers'
						onInput={(event) => this.onSearchInput(event)}>
					</input>

					{/* error */}
					{
						!this.mError || this.mError.trim() == '' ?
							<div /> :
							<p class="text-danger">{this.mError}</p>
					}

					<button class='container-fluid btn btn-primary mt-2' onClick={() => this.searchRepo()}>Search</button>
				</div>
				{
					this.mData.length == 0 && this.mSearchText ?
					<p>No repository found for {this.mSearchText}</p> :
					
					// returned repositories
					this.mData.map((item) =>
						<div class='card mt-2 p-3' onClick={() => this.onItemClick(item)}>
							<div class='row padding'>
								<img src={item.owner.avatar_url} width='50' height='50' />
								<div class='col-10'>
									<b>{item.name}</b>
									<p><a href={item.html_url}>{item.html_url}</a></p>
								</div>
							</div>
							<p>{item.description}</p>
						</div>
					)
				}
			</div>
		]
	}
}