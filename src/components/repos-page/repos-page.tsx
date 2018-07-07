import { Component, State, Prop, Listen } from '@stencil/core'
import { Repo } from '../../common/repo';
import { RouterHistory } from '@stencil/router';
import { BasePage } from '../base-page';
import { Constant } from '../../global/constant';
import { Observable, zip, Subscriber } from 'rxjs';


@Component({
	tag: 'repos-page',
	styleUrl: 'repos-page.scss'
})
export class ReposPage extends BasePage {
	private readonly SORT_OPTION_DEVELOPERS = 1
	private readonly SORT_OPTION_KEYWORD = 2

	@Prop() history: RouterHistory;
	@State() mData: Repo[] = [];
	@State() mError: string;
	@State() mIsLoading: boolean = false;
	@State() mSortOption: number = this.SORT_OPTION_KEYWORD;

	mSearchText: string;

	componentWillLoad() {
		super.componentWillLoad()

		let cacheData = window.sessionStorage.getItem(Constant.PREF_CACHE_REPOS)
		if (cacheData) {
			this.mData = JSON.parse(cacheData)
      }
	}

	private getReposFromApi(developer: string) {
		this.mIsLoading = true

		switch (this.mSortOption) {
			case this.SORT_OPTION_DEVELOPERS:
				this.searchByDevelopers()
				break;
			case this.SORT_OPTION_KEYWORD:
				this.searchByKeyword()
				break;
		}
	}

	private searchByKeyword() {
		// keyword search
		fetch(`https://api.github.com/search/repositories?q=${this.mSearchText}`).then(response => {
			this.mIsLoading = false
			if (response.status != 200) {
				this.mData = []
				this.cacheResponse()
				return;
			}

			response.json().then(data => {
				this.mData = data['items']
				this.cacheResponse()
			})
		})
	}

	private searchByDevelopers() {
		let developer = this.mSearchText

		// get repositories from the specific user
		let f1: Observable<any> = Observable.create((observer: Subscriber<Repo[]>) => {
			fetch(`https://api.github.com/users/${developer}/repos`).then(response => {
				this.mIsLoading = false
				if (response.status != 200) {
					observer.next([])
					return;
				}

				response.json().then(data => {
					observer.next(data)
				})
			})
		})

		// get repositories from the specific organization
		let f2: Observable<any> = Observable.create((observer: Subscriber<Repo[]>) => {
			fetch(`https://api.github.com/orgs/${developer}/repos`).then(response => {
				if (response.status != 200) {
					observer.next([])
					return;
				}

				response.json().then(data => {
					observer.next(data)
				})
			})
		})

		// user RX way to combine the two api calls
		zip(f1, f2).subscribe((data) => {
			let result: Repo[] = []
			let ids: {} = {}
			result = result.concat(data[0], data[1])
				.filter((repo, index, arr) => {
					let key = repo.id + ''
					if (!ids[key]) {
						ids[key] = repo.id
						return true
					}
					return false
				})
				.sort((a, b) => a.name.localeCompare(b.name))

			ids = {}
			this.mData = result;

			// cache the response data for return use
			this.cacheResponse()
		})
	}

	private cacheResponse() {
		window.sessionStorage.setItem(Constant.PREF_CACHE_REPOS, JSON.stringify(this.mData))
	}

	private onItemClick(item: Repo) {
		this.history.push(`/repo-detail/${item.owner.login}/${item.name}`, {})
	}

	private searchRepo() {
		if (!this.mSearchText) {
			this.mError = 'The field is required'
			return;
		}

		this.mError = ''
		this.getReposFromApi(this.mSearchText)
	}

	private onSearchInput(event) {
		let value = event.target.value
		this.mSearchText = value ? value.trim() : value
	}

	private onSortChange(event) {
		let value: number = parseInt(event.target.value)

		this.mSortOption = value
	}

	render() {
		return [
			<div class='container'>
				<div class='form-control'>
					{/* sorting */}
					<div class='input-field col s12'>
						<select onChange={(e) => this.onSortChange(e)}>
							<option value={this.SORT_OPTION_DEVELOPERS}>Search by developers</option>
							<option value={this.SORT_OPTION_KEYWORD} selected>Search by keywords</option>
						</select>
					</div>

					{/* search box */}
					<input class='form-control' type='text' placeholder='Search'
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
							<span class="error-text">{this.mError}</span>
					}

					<button class='btn waves-effect full-width' onClick={() => this.searchRepo()}>Search</button>
				</div>

				{
					// progress bar
					this.mIsLoading ?
						<div class='full-width mt'>
							<progress-bar></progress-bar>
						</div>
						: <div />
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