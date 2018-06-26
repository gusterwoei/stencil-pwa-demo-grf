import { Component, Prop } from "@stencil/core";

@Component({
	tag: 'progress-bar',
	styleUrl: 'progress-bar.css'
})
export class ProgressBar {
	@Prop() isHorizontal: boolean = false

	render() {
		return (
			this.isHorizontal ?
				<div class='progress'>
					<div class='indeterminate' />
				</div>
				:
				<div class="preloader-wrapper small active">
					<div class="spinner-layer spinner-green-only">
						<div class="circle-clipper left">
							<div class="circle"></div>
						</div><div class="gap-patch">
							<div class="circle"></div>
						</div><div class="circle-clipper right">
							<div class="circle"></div>
						</div>
					</div>
				</div>
		)
	}
}