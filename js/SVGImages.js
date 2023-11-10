class SVGImages{
	images;
	debug;

	constructor( debug = false )
	{
		this.images				= {
			book: { width: 24, height: 24, img: '<path class="stroke" d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path class="stroke" d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>' },

			close: { width: 24, height: 24, img: '<path class="stroke" d="M15 9.00004L9 15M15 15L9 9.00004M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' },
			contrast: { width: 512, height: 512, img: '<circle class="stroke" cx="256" cy="256" r="208" style="stroke-width:32px"/><path class="fill" d="M256,464C141.12,464,48,370.88,48,256S141.12,48,256,48Z"/>' },
			contrast2: { width: 24, height: 24, img: '<path class="stroke" d="M20.83,7.32h0a10.11,10.11,0,0,0-3.44-3.73l0,0h0A10,10,0,1,0,12,22h.29A10,10,0,0,0,20.83,7.32ZM11,19.93A8,8,0,0,1,11,4.07ZM13,4.07a8.07,8.07,0,0,1,2.49.74L13,9.12Zm0,9L17.17,5.9a8.14,8.14,0,0,1,1.58,1.83L13,17.69Zm1.15,6.58L19.74,10A8.16,8.16,0,0,1,20,12,8,8,0,0,1,14.15,19.7Z"/>' },
			crop: { width: 24, height: 24, img: '<path class="stroke" d="M6.13 1L6 16a2 2 0 0 0 2 2h15"></path><path  class="stroke" d="M1 6.13L16 6a2 2 0 0 1 2 2v15"></path>' },
			crop2: { width: 32, height: 32, img: '<path class="stroke" d="M0 28v4h4v-1.984h-1.984v-2.016h-2.016zM0 4h2.016v-1.984h1.984v-2.016h-4v4zM4 28h24v-24h-24v24zM8 24v-16h16v16h-16zM10.016 22.016h2.656q-0.352-0.16-0.768-0.608t-1.056-1.28-0.832-1.12v3.008zM10.016 12q0 0.832 0.576 1.44t1.408 0.576 1.408-0.576 0.608-1.44-0.608-1.408-1.408-0.576-1.408 0.576-0.576 1.408zM13.216 22.016h8.8v-7.328q-0.48-0.512-0.96-0.608t-0.992 0.16-0.96 0.8-1.024 1.184-0.992 1.408-1.024 1.472-0.96 1.344-0.96 1.024-0.928 0.544zM28 30.016v1.984h4v-4h-1.984v2.016h-2.016zM28 2.016h2.016v1.984h1.984v-4h-4v2.016z"></path>' },

			discord: { width: 32, height: 32, img: '<path class="fill" d="M 12.65625 4.90625 L 11.875 5 C 11.875 5 8.371094 5.382813 5.8125 7.4375 L 5.78125 7.4375 L 5.75 7.46875 C 5.175781 7.996094 4.925781 8.644531 4.53125 9.59375 C 4.136719 10.542969 3.714844 11.753906 3.34375 13.09375 C 2.601563 15.777344 2 19.027344 2 22 L 2 22.25 L 2.125 22.5 C 3.050781 24.125 4.695313 25.160156 6.21875 25.875 C 7.742188 26.589844 9.058594 26.96875 9.96875 27 L 10.5625 27.03125 L 10.875 26.5 L 11.96875 24.5625 C 13.128906 24.824219 14.464844 25 16 25 C 17.535156 25 18.871094 24.824219 20.03125 24.5625 L 21.125 26.5 L 21.4375 27.03125 L 22.03125 27 C 22.941406 26.96875 24.257813 26.589844 25.78125 25.875 C 27.304688 25.160156 28.949219 24.125 29.875 22.5 L 30 22.25 L 30 22 C 30 19.027344 29.398438 15.777344 28.65625 13.09375 C 28.285156 11.753906 27.863281 10.542969 27.46875 9.59375 C 27.074219 8.644531 26.824219 7.996094 26.25 7.46875 L 26.21875 7.4375 L 26.1875 7.4375 C 23.628906 5.382813 20.125 5 20.125 5 L 19.34375 4.90625 L 19.0625 5.625 C 19.0625 5.625 18.773438 6.355469 18.59375 7.1875 C 17.460938 7.035156 16.535156 7 16 7 C 15.464844 7 14.539063 7.035156 13.40625 7.1875 C 13.226563 6.355469 12.9375 5.625 12.9375 5.625 Z M 11.28125 7.1875 C 11.324219 7.328125 11.367188 7.449219 11.40625 7.5625 C 10.113281 7.882813 8.734375 8.371094 7.46875 9.15625 L 8.53125 10.84375 C 11.125 9.234375 14.851563 9 16 9 C 17.148438 9 20.875 9.234375 23.46875 10.84375 L 24.53125 9.15625 C 23.265625 8.371094 21.886719 7.882813 20.59375 7.5625 C 20.632813 7.449219 20.675781 7.328125 20.71875 7.1875 C 21.652344 7.375 23.433594 7.804688 24.90625 8.96875 C 24.898438 8.972656 25.28125 9.550781 25.625 10.375 C 25.976563 11.222656 26.367188 12.351563 26.71875 13.625 C 27.394531 16.066406 27.925781 19.039063 27.96875 21.65625 C 27.339844 22.617188 26.171875 23.484375 24.9375 24.0625 C 23.859375 24.566406 23.007813 24.75 22.5 24.84375 L 22 24 C 22.296875 23.890625 22.589844 23.769531 22.84375 23.65625 C 24.382813 22.980469 25.21875 22.25 25.21875 22.25 L 23.90625 20.75 C 23.90625 20.75 23.34375 21.265625 22.03125 21.84375 C 20.71875 22.421875 18.714844 23 16 23 C 13.285156 23 11.28125 22.421875 9.96875 21.84375 C 8.65625 21.265625 8.09375 20.75 8.09375 20.75 L 6.78125 22.25 C 6.78125 22.25 7.617188 22.980469 9.15625 23.65625 C 9.410156 23.769531 9.703125 23.890625 10 24 L 9.5 24.84375 C 8.992188 24.75 8.140625 24.566406 7.0625 24.0625 C 5.828125 23.484375 4.660156 22.617188 4.03125 21.65625 C 4.074219 19.039063 4.605469 16.066406 5.28125 13.625 C 5.632813 12.351563 6.023438 11.222656 6.375 10.375 C 6.71875 9.550781 7.101563 8.972656 7.09375 8.96875 C 8.566406 7.804688 10.347656 7.375 11.28125 7.1875 Z M 12.5 14 C 11.726563 14 11.042969 14.441406 10.625 15 C 10.207031 15.558594 10 16.246094 10 17 C 10 17.753906 10.207031 18.441406 10.625 19 C 11.042969 19.558594 11.726563 20 12.5 20 C 13.273438 20 13.957031 19.558594 14.375 19 C 14.792969 18.441406 15 17.753906 15 17 C 15 16.246094 14.792969 15.558594 14.375 15 C 13.957031 14.441406 13.273438 14 12.5 14 Z M 19.5 14 C 18.726563 14 18.042969 14.441406 17.625 15 C 17.207031 15.558594 17 16.246094 17 17 C 17 17.753906 17.207031 18.441406 17.625 19 C 18.042969 19.558594 18.726563 20 19.5 20 C 20.273438 20 20.957031 19.558594 21.375 19 C 21.792969 18.441406 22 17.753906 22 17 C 22 16.246094 21.792969 15.558594 21.375 15 C 20.957031 14.441406 20.273438 14 19.5 14 Z M 12.5 16 C 12.554688 16 12.625 16.019531 12.75 16.1875 C 12.875 16.355469 13 16.648438 13 17 C 13 17.351563 12.875 17.644531 12.75 17.8125 C 12.625 17.980469 12.554688 18 12.5 18 C 12.445313 18 12.375 17.980469 12.25 17.8125 C 12.125 17.644531 12 17.351563 12 17 C 12 16.648438 12.125 16.355469 12.25 16.1875 C 12.375 16.019531 12.445313 16 12.5 16 Z M 19.5 16 C 19.554688 16 19.625 16.019531 19.75 16.1875 C 19.875 16.355469 20 16.648438 20 17 C 20 17.351563 19.875 17.644531 19.75 17.8125 C 19.625 17.980469 19.554688 18 19.5 18 C 19.445313 18 19.375 17.980469 19.25 17.8125 C 19.125 17.644531 19 17.351563 19 17 C 19 16.648438 19.125 16.355469 19.25 16.1875 C 19.375 16.019531 19.445313 16 19.5 16 Z"/>' },
			download_cloud: { width: 24, height: 24, img: '<polyline class="stroke" points="8 17 12 21 16 17"></polyline><line class="stroke" x1="12" y1="12" x2="12" y2="21"></line><path class="stroke" d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"></path>' },

			edit: { width: 24, height: 24, img: '<path class="stroke" d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path class="stroke" d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>' },
			elements: { width: 512, height: 512, img: '<path class="fill" d="M262.406 17.188c-27.22 8.822-54.017 28.012-72.375 55.53 17.544 47.898 17.544 57.26 0 105.157 19.92 15.463 40.304 24.76 60.782 27.47-2.063-25.563-3.63-51.13 1.125-76.69-13.625-1.483-23.374-5.995-37-13.874V82.563c35.866 19.096 61.84 18.777 98.813 0v32.22c-13.364 6.497-21.886 11.16-35.25 13.218 3.614 25.568 3.48 51.15 1.375 76.72 18.644-3.265 37.236-12.113 55.5-26.845-14.353-47.897-14.355-57.26 0-105.156-16.982-28.008-47.453-46.633-72.97-55.532zm-129.594 8.218c-25.906 110.414-27.35 215.33-27.4 330.922-18.84-1.537-37.582-5.12-56.027-11.12v28.554h69.066c8.715 35.025 6.472 70.052-1.036 105.078h28.13c-7.195-35.026-8.237-70.053-.872-105.078h68.904v-28.555c-18.49 4.942-37.256 8.552-56.097 10.46.082-114.94 2.496-223.068-24.667-330.26zm89.47 202.375c0 117.27 25.517 233.342 120.155 257.97C446.62 464.716 462.72 345.374 462.72 227.78H222.28z" fill-opacity="1"></path>' },

			frame: { width: 57, height: 57, img: '<g><path class="fill" d="M47,12h-9.625l-6.652-5.82C31.497,5.537,32,4.581,32,3.5C32,1.57,30.43,0,28.5,0S25,1.57,25,3.5 c0,1.081,0.503,2.037,1.276,2.68L19.625,12H10c-0.553,0-1,0.448-1,1v43c0,0.552,0.447,1,1,1h37c0.553,0,1-0.448,1-1V13 C48,12.448,47.553,12,47,12z M11,15.414l6,6v26.172l-6,6V15.414z M44.586,14l-6,6H18.414l-6-6H44.586z M38,38.519l-3.747,2.998 L27.348,30.47c-0.152-0.244-0.402-0.411-0.687-0.457c-0.285-0.047-0.574,0.032-0.797,0.215L19,35.881V22h19V38.519z M19,38.472 l7.256-5.975l6.896,11.033c0.151,0.242,0.398,0.408,0.68,0.456C33.888,43.995,33.944,44,34,44c0.226,0,0.446-0.076,0.625-0.219 l3.375-2.7V47H19V38.472z M18.414,49h20.172l6,6H12.414L18.414,49z M40,47.586V21.414l6-6v38.172L40,47.586z M28.5,2 C29.327,2,30,2.673,30,3.5S29.327,5,28.5,5S27,4.327,27,3.5S27.673,2,28.5,2z M28.388,6.989C28.426,6.99,28.462,7,28.5,7 s0.074-0.01,0.112-0.011L34.339,12H22.661L28.388,6.989z"/><path class="fill" d="M32,31c2.206,0,4-1.794,4-4s-1.794-4-4-4s-4,1.794-4,4S29.794,31,32,31z M32,25c1.103,0,2,0.897,2,2s-0.897,2-2,2 s-2-0.897-2-2S30.897,25,32,25z"/></g>' },
			flip_v: { width: 24, height: 24, img: '<path class="fill" d="M10 21a.99018.99018 0 0 1-.71-.29 1.16044 1.16044 0 0 1-.21-.33008A.83154.83154 0 0 1 9 20a1 1 0 1 1 2 0 .99042.99042 0 0 1-1 1zM5.5 20a1.0032 1.0032 0 0 1 1-1h0a1.0032 1.0032 0 0 1 1 1h0a1.0032 1.0032 0 0 1-1 1h0A1.0032 1.0032 0 0 1 5.5 20zM3 21a.99018.99018 0 0 1-.71-.29 1.16044 1.16044 0 0 1-.21-.33008A.9994.9994 0 0 1 2 20a1.04778 1.04778 0 0 1 .29-.71 1.04667 1.04667 0 0 1 1.41992 0A1.05232 1.05232 0 0 1 4 20a.9994.9994 0 0 1-.08008.37988 1.16044 1.16044 0 0 1-.21.33008A.99349.99349 0 0 1 3 21zM3.75977 16.96973a.99816.99816 0 0 1-.7295-1.21h0a.99364.99364 0 0 1 1.21-.7295h0a.99891.99891 0 0 1 .7295 1.21h0A.992.992 0 0 1 4 17H4A.96451.96451 0 0 1 3.75977 16.96973zm.99023-4a.99212.99212 0 0 1-.71973-1.21h0a.99816.99816 0 0 1 1.21-.7295h0a.99891.99891 0 0 1 .7295 1.21h0A1.00024 1.00024 0 0 1 5 13H5A1.10439 1.10439 0 0 1 4.75 12.96973zm1.00977-4a.99816.99816 0 0 1-.7295-1.21h0a.99364.99364 0 0 1 1.21-.7295h0a.99891.99891 0 0 1 .7295 1.21h0A.992.992 0 0 1 6 9H6A.96451.96451 0 0 1 5.75977 8.96973zM7 5A.99042.99042 0 0 1 6 4a1.04778 1.04778 0 0 1 .29-.71 1.03423 1.03423 0 0 1 1.41016 0A1.01842 1.01842 0 0 1 8 4 1.00694 1.00694 0 0 1 7 5zM10 5A.99042.99042 0 0 1 9 4a1.04778 1.04778 0 0 1 .29-.71 1.04669 1.04669 0 0 1 1.41992 0A1.05232 1.05232 0 0 1 11 4a.99042.99042 0 0 1-1 1zM9 16a1.0032 1.0032 0 0 1 1-1h0a1.0032 1.0032 0 0 1 1 1h0a1.0032 1.0032 0 0 1-1 1h0A1.0032 1.0032 0 0 1 9 16zm0-4a1.0032 1.0032 0 0 1 1-1h0a1.0032 1.0032 0 0 1 1 1h0a1.0032 1.0032 0 0 1-1 1h0A1.0032 1.0032 0 0 1 9 12zM9 8a1.0032 1.0032 0 0 1 1-1h0a1.0032 1.0032 0 0 1 1 1h0a1.0032 1.0032 0 0 1-1 1h0A1.0032 1.0032 0 0 1 9 8z"/><polygon class="fill" points="14 20 21 20 17 4 14 4 14 20"/><path class="fill" d="M21,21H14a.99943.99943,0,0,1-1-1V4a.99943.99943,0,0,1,1-1h3a.99962.99962,0,0,1,.96973.75781l4,16A.9997.9997,0,0,1,21,21Zm-6-2h4.71875l-3.5-14H15Z"/>' },

			globe: { width: 24, height: 24, img: '<circle  class="stroke" cx="12" cy="12" r="10"></circle><line  class="stroke" x1="2" y1="12" x2="22" y2="12"></line><path  class="stroke" d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>' },
			grid: { width: 24, height: 24, img: '<rect class="stroke" x="3" y="3" width="7" height="7"></rect><rect class="stroke" x="14" y="3" width="7" height="7"></rect><rect class="stroke" x="14" y="14" width="7" height="7"></rect><rect class="stroke" x="3" y="14" width="7" height="7"></rect>' },

			image: { width: 24, height: 24, img: '<rect class="stroke" x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle class="stroke" cx="8.5" cy="8.5" r="1.5"></circle><polyline class="stroke" points="21 15 16 10 5 21"></polyline>' },
			info: { width: 24, height: 24, img: '<circle class="stroke" cx="12" cy="12" r="10"></circle><line class="stroke" x1="12" y1="16" x2="12" y2="12"></line><line class="stroke" x1="12" y1="7" x2="12" y2="8"></line>' },

			keyboard: { width: 512, height: 512, img: '<g><path class="fill" d="M451.791,76.035H60.21C27.018,76.035,0,103.059,0,136.25v221.526c0,43.111,35.072,78.189,78.178,78.189 h355.644c43.106,0,78.178-35.078,78.178-78.189V136.25C512,103.059,484.982,76.035,451.791,76.035z M481.582,357.776 c0,26.34-21.426,47.765-47.76,47.765H78.178c-26.334,0-47.76-21.425-47.76-47.765V136.25c0-16.43,13.367-29.791,29.792-29.791 h391.581c16.424,0,29.791,13.36,29.791,29.791V357.776z"/><path class="fill" d="M150.967,281.349h32.636c4.986,0,9.028-4.042,9.028-9.028v-32.642c0-4.986-4.042-9.028-9.028-9.028h-32.636 c-4.987,0-9.029,4.042-9.029,9.028v32.642C141.938,277.307,145.98,281.349,150.967,281.349z"/><path class="fill" d="M227.01,281.349h32.631c4.987,0,9.029-4.042,9.029-9.028v-32.642c0-4.986-4.042-9.028-9.029-9.028H227.01 c-4.986,0-9.029,4.042-9.029,9.028v32.642C217.981,277.307,222.024,281.349,227.01,281.349z"/><path class="fill" d="M303.048,281.349h32.636c4.986,0,9.029-4.042,9.029-9.028v-32.642c0-4.986-4.043-9.028-9.029-9.028h-32.636 c-4.986,0-9.029,4.042-9.029,9.028v32.642C294.019,277.307,298.062,281.349,303.048,281.349z"/><path class="fill" d="M437.067,306.694h-32.632c-4.986,0-9.028,4.043-9.028,9.029v32.631c0,4.986,4.042,9.029,9.028,9.029h32.632 c4.986,0,9.029-4.043,9.029-9.029v-32.631C446.096,310.737,442.052,306.694,437.067,306.694z"/><path class="fill" d="M150.967,205.307h32.636c4.986,0,9.028-4.043,9.028-9.029v-32.631c0-4.986-4.042-9.028-9.028-9.028h-32.636 c-4.987,0-9.029,4.042-9.029,9.028v32.631C141.938,201.264,145.98,205.307,150.967,205.307z"/><path class="fill" d="M107.566,230.651H74.929c-4.986,0-9.029,4.042-9.029,9.028v32.642c0,4.986,4.043,9.028,9.029,9.028h32.636 c4.986,0,9.029-4.042,9.029-9.028v-32.642C116.594,234.693,112.551,230.651,107.566,230.651z"/><path class="fill" d="M107.566,154.619H74.929c-4.986,0-9.029,4.042-9.029,9.028v32.631c0,4.986,4.043,9.029,9.029,9.029h32.636 c4.986,0,9.029-4.043,9.029-9.029v-32.631C116.594,158.661,112.551,154.619,107.566,154.619z"/><path class="fill" d="M107.566,306.694H74.934c-4.987,0-9.029,4.043-9.029,9.029v32.631c0,4.986,4.042,9.029,9.029,9.029h32.631 c4.986,0,9.029-4.043,9.029-9.029v-32.631C116.594,310.737,112.551,306.694,107.566,306.694z"/><path class="fill" d="M227.01,205.307h32.631c4.987,0,9.029-4.043,9.029-9.029v-32.631c0-4.986-4.042-9.028-9.029-9.028H227.01 c-4.986,0-9.029,4.042-9.029,9.028v32.631C217.981,201.264,222.024,205.307,227.01,205.307z"/><path class="fill" d="M303.048,205.307h32.636c4.986,0,9.029-4.043,9.029-9.029v-32.631c0-4.986-4.043-9.028-9.029-9.028h-32.636 c-4.986,0-9.029,4.042-9.029,9.028v32.631C294.019,201.264,298.062,205.307,303.048,205.307z"/><path class="fill" d="M361.029,306.694H150.967c-4.987,0-9.029,4.043-9.029,9.029v32.631c0,4.986,4.042,9.029,9.029,9.029h210.062 c4.986,0,9.028-4.043,9.028-9.029v-32.631C370.057,310.737,366.014,306.694,361.029,306.694z"/><path class="fill" d="M437.067,154.619h-57.981c-4.987,0-9.029,4.042-9.029,9.028v108.674c0,4.986,4.042,9.028,9.029,9.028h57.981 c4.986,0,9.029-4.042,9.029-9.028V163.647C446.096,158.661,442.052,154.619,437.067,154.619z"/></g>' },
			
			layout: { width: 24, height: 24, img: '<rect class="stroke" x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line class="stroke" x1="3" y1="9" x2="21" y2="9"></line><line class="stroke" x1="9" y1="21" x2="9" y2="9"></line>' },

			mask: { width: 100, height: 100, img: '<path class="fill" d="M30,42c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8S34.4,42,30,42z M30,56c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S33.3,56,30,56z "/><path class="fill" d="M94,30.2c-1.2-0.4-2.5-0.1-3.3,0.8l-4.2,5c-9.8-0.1-19.5-2.8-28.8-8c-2.3-1.3-4.9-1.9-7.5-2c-0.1,0-0.1,0-0.2,0 s-0.1,0-0.2,0c-2.6,0-5.2,0.7-7.5,2c-9.3,5.2-19,7.9-28.8,8l-4.2-5c-0.8-0.9-2.1-1.3-3.3-0.8c-1.2,0.4-2,1.6-2,2.8v10.4 c0,6.3,3.1,12,8.3,15.4C13.6,60.1,27.2,74,50,74s36.4-13.9,37.7-15.2c5.2-3.4,8.3-9.1,8.3-15.4V33C96,31.8,95.2,30.6,94,30.2z M6,43.4V33c0-0.7,0.5-0.9,0.7-1c0.2-0.1,0.7-0.2,1.1,0.3l4.3,5V56C8.2,53,6,48.4,6,43.4z M14,38c10-0.2,19.9-2.9,29.3-8.3 c1.7-1,3.7-1.5,5.7-1.6V72c-20.2-0.4-33-12.4-35-14.4V38z M86,57.6c-2,2-14.8,14-35,14.4V28.1c2,0.1,4,0.7,5.7,1.6    C66.1,35,76,37.8,86,38V57.6z M94,43.4c0,5-2.2,9.6-6,12.6V37.4l4.2-5c0.4-0.5,0.9-0.3,1.1-0.3c0.2,0.1,0.7,0.3,0.7,1V43.4z"/>' },
			maximize: { width: 24, height: 24, img: '<polyline class="stroke" points="15 3 21 3 21 9"></polyline><polyline class="stroke" points="9 21 3 21 3 15"></polyline><line class="stroke" x1="21" y1="3" x2="14" y2="10"></line><line class="stroke" x1="3" y1="21" x2="10" y2="14"></line>' },
			menu: { width: 24, height: 24, img: '<line class="stroke" x1="3" y1="12" x2="21" y2="12"></line><line class="stroke" x1="3" y1="6" x2="21" y2="6"></line><line class="stroke" x1="3" y1="18" x2="21" y2="18"></line>' },
			minus_square: { width: 24, height: 24, img: '<rect class="stroke" x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line class="stroke" x1="8" y1="12" x2="16" y2="12"></line>' },
			min_sun: { width: 24, height: 24, img: '<circle class="stroke" cx="12" cy="12" r="5"></circle>' },

			na: { width: 17, height: 17, img: '<path class="stroke" d="M8.5 0.5c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zM8.5 1.5c1.75 0 3.348 0.65 4.577 1.716l-9.86 9.861c-1.067-1.228-1.717-2.827-1.717-4.577 0-3.859 3.14-7 7-7zM8.5 15.5c-1.75 0-3.348-0.65-4.577-1.716l9.86-9.861c1.067 1.228 1.717 2.827 1.717 4.577 0 3.859-3.14 7-7 7z" fill="#000000" />' },

			help: { width: 32, height: 32, img: '<g><g><g><path d=" M21.5,18.5h-11c-1.66,0-3-1.34-3-3v-11c0-1.66,1.34-3,3-3h11c1.66,0,3,1.34,3,3v11C24.5,17.16,23.16,18.5,21.5,18.5z" fill="none" stroke="#455A64" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path class="stroke" d=" M26.5,5.521L26.5,5.521c1.657,0,3,1.343,3,3v15c0,1.657-1.343,3-3,3H23l-3.5,4v-4h-14c-1.657,0-3-1.343-3-3v-15 c0-1.657,1.343-3,3-3h0" fill="none" stroke="#455A64" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path class="stroke" d=" M16,13v-0.542c0-0.904,0.475-1.743,1.25-2.208l0,0c0.775-0.465,1.25-1.304,1.25-2.208V8c0-1.381-1.119-2.5-2.5-2.5l0,0 c-1.381,0-2.5,1.119-2.5,2.5l0,0" fill="none" stroke="#455A64" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><line class="stroke" fill="#FFFFFF" stroke="#455A64" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="16" x2="16" y1="15" y2="14.867"/><line class="stroke" fill="none" stroke="#455A64" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="18.6" x2="18.5" y1="22.5" y2="22.5"/><line class="stroke" fill="none" stroke="#455A64" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="16.1" x2="16" y1="22.5" y2="22.5"/><line class="stroke" fill="none" stroke="#455A64" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="13.6" x2="13.5" y1="22.5" y2="22.5"/></g></g><g><g><path class="stroke" d=" M21.5,18.5h-11c-1.66,0-3-1.34-3-3v-11c0-1.66,1.34-3,3-3h11c1.66,0,3,1.34,3,3v11C24.5,17.16,23.16,18.5,21.5,18.5z" fill="none" stroke="#263238" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path class="stroke" d=" M26.5,5.521L26.5,5.521c1.657,0,3,1.343,3,3v15c0,1.657-1.343,3-3,3H23l-3.5,4v-4h-14c-1.657,0-3-1.343-3-3v-15 c0-1.657,1.343-3,3-3h0" fill="none" stroke="#263238" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path class="stroke" d=" M16,13v-0.542c0-0.904,0.475-1.743,1.25-2.208l0,0c0.775-0.465,1.25-1.304,1.25-2.208V8c0-1.381-1.119-2.5-2.5-2.5l0,0 c-1.381,0-2.5,1.119-2.5,2.5l0,0" fill="none" stroke="#263238" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><line class="stroke" fill="none" stroke="#263238" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="16" x2="16" y1="15" y2="14.867"/><line class="stroke" fill="none" stroke="#263238" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="18.6" x2="18.5" y1="22.5" y2="22.5"/><line class="stroke" fill="none" stroke="#263238" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="16.1" x2="16" y1="22.5" y2="22.5"/><line class="stroke" fill="none" stroke="#263238" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="13.6" x2="13.5" y1="22.5" y2="22.5"/></g></g></g>' },
			home: { width: 24, height: 24, img: '<path class="stroke" d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline class="stroke" points="9 22 9 12 15 12 15 22"></polyline>' },

			package: { width: 24, height: 24, img: '<line class="stroke" x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path class="stroke" d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline class="stroke" points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line class="stroke" x1="12" y1="22.08" x2="12" y2="12"></line>' },
			plus_square: { width: 24, height: 24, img: '<rect class="stroke" x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line class="stroke" x1="12" y1="8" x2="12" y2="16"></line><line class="stroke" x1="8" y1="12" x2="16" y2="12"></line>' },
			popup: { width: 20, height: 20, img: '<path class="fill" d="M16 2H7.979C6.88 2 6 2.88 6 3.98V12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 10H8V4h8v8zM4 10H2v6c0 1.1.9 2 2 2h6v-2H4v-6z"/>' },
			print: { width: 24, height: 24, img: '<polyline class="stroke" points="6 9 6 2 18 2 18 9"></polyline><path class="stroke" d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect class="stroke" x="6" y="14" width="12" height="8"></rect>' },

			random: { width: 24, height: 24, img: '<path class="fill" d="M17,2H7A5,5,0,0,0,2,7V17a5,5,0,0,0,5,5H17a5,5,0,0,0,5-5V7A5,5,0,0,0,17,2Zm3,15a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V7A3,3,0,0,1,7,4H17a3,3,0,0,1,3,3ZM8,15a1,1,0,1,0,1,1A1,1,0,0,0,8,15Zm4-4a1,1,0,1,0,1,1A1,1,0,0,0,12,11ZM8,7A1,1,0,1,0,9,8,1,1,0,0,0,8,7Zm8,8a1,1,0,1,0,1,1A1,1,0,0,0,16,15Zm0-8a1,1,0,1,0,1,1A1,1,0,0,0,16,7Z"/>' },
			resolution: { width: 2048, height: 2048, img: '<path class="fill" d="M896 128h1024v1792H128V896h384V640H128V128h512v384h256V128zm128 128v256h256V256h-256zM256 512h256V256H256v256zm384 128v256h256V640H640zm-384 384v256h256v-256H256zm1536 768V256h-384v384h-384v384H640v384H256v384h1536z"/>' },
			rotate_ccw: { width: 24, height: 24, img: '<polyline class="stroke" points="1 4 1 10 7 10"></polyline><path class="stroke" d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>' },

			saturation: { width: 20, height: 20, img: '<path class="stroke" d="M10.203.561c-.027-.215-.38-.215-.406 0-.883 7.107-5.398 8.572-5.398 13.512 0 3.053 2.564 5.527 5.601 5.527 3.036 0 5.6-2.475 5.6-5.527 0-4.94-4.514-6.405-5.397-13.512zM9.35 8.418c-.059.219-.123.444-.189.678-.401 1.424-.856 3.039-.856 4.906 0 1.012-.598 1.371-1.156 1.371a1.161 1.161 0 0 1-1.156-1.166c0-2.207 1.062-3.649 2-4.92.295-.398.572-.775.797-1.15.103-.172.38-.164.506.006.059.08.079.182.054.275z"/>' },
			save: { width: 24, height: 24, img: '<path class="stroke" d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline class="stroke" points="17 21 17 13 7 13 7 21"></polyline><polyline class="stroke" points="7 3 7 8 15 8"></polyline>' },
			share: { width: 24, height: 24, img: '<circle class="stroke" cx="18" cy="5" r="3"></circle><circle class="stroke" cx="6" cy="12" r="3"></circle><circle class="stroke" cx="18" cy="19" r="3"></circle><line class="stroke" x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line class="stroke" x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>' },
			sets: { width: 512, height: 512, img: '<path d="M0 0h512v512H0z" fill="#412323" fill-opacity="0"></path><g transform="translate(0,0)"><path class="fill" d="M467.838 35.848c-53.208 3.518-101.284 8.091-139.14 50.18 9.869 29.563 26.168 65.884 46.613 95.234 20.504 29.436 44.758 50.59 68.61 53.297 35.265-33.057 53.699-112.599 23.917-198.711zM189.8 46.02a70.936 54.43 66.039 0 0-15.987 3.638 70.936 54.43 66.039 0 0-20.931 86.928 70.936 54.43 66.039 0 0 51.62 45.443c2.392 57.507-19.428 43.883-70.534 73.606l15.888 31.69c35.566-13.731 51.844-19.703 69.27-44.317 32.586 93.92-1.874 157.236-23.688 247.078l33.711 4.916c23.698-57.247 55.114-122.355 62.438-181.422 48.937 51.134 77.498 114.641 114.65 169.143l35.82-14.75c-45.81-80.724-65.633-128.371-150.591-262.19 26.819-.194 49.826-6.592 70.683-15.422-7.036-10.105-13.565-20.882-19.529-31.886-28.223 12.083-59.028 16.997-90.14.855a70.936 54.43 66.039 0 0-.118-66.955 70.936 54.43 66.039 0 0-62.562-46.355zM15.47 87.309l3.287 34.09 52.6 107.77 21.568-10.526-52.383-107.325-25.072-24.01zm97.066 139.566l-46.756 22.822 3.137 18.496 56.271-27.464-12.652-13.854zm2.318 36.701l-21.568 10.528 16.668 34.15 21.568-10.527-16.668-34.15z"></path></g>' },
			settings: { width: 24, height: 24, img: '<circle class="stroke" cx="12" cy="12" r="3"></circle><path class="stroke" d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>' },
			star: { width: 24, height: 24, img: '<polygon class="stroke" points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>' },
			sun: { width: 24, height: 24, img: '<circle class="stroke" cx="12" cy="12" r="5"></circle><line class="stroke" x1="12" y1="1" x2="12" y2="3"></line><line class="stroke" x1="12" y1="21" x2="12" y2="23"></line><line class="stroke" x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line class="stroke" x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line class="stroke" x1="1" y1="12" x2="3" y2="12"></line><line class="stroke" x1="21" y1="12" x2="23" y2="12"></line><line class="stroke" x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line class="stroke" x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>' },

			telegram: { width: 1080, height: 1080, img: '<path d="M729.796 386.21L662.016 705.86C656.902 728.42 643.567 734.032 624.616 723.408L521.342 647.304L471.512 695.231C465.998 700.745 461.384 705.359 450.756 705.359L458.176 600.178L649.583 427.219C657.907 419.799 647.779 415.688 636.649 423.108L400.021 572.103L298.151 540.22C275.992 533.3 275.593 518.06 302.763 507.433L701.219 353.924C719.667 347.007 735.81 358.035 729.796 386.21Z" fill="url(#paint0_linear)"/><rect height="760" rx="380" stroke="url(#paint1_linear)" stroke-width="27" width="760" x="157.5" y="159.5"/><defs><linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear" x1="468.5" x2="710.864" y1="286.5" y2="883.047"><stop stop-color="#6BBFEC" stop-opacity="0.7"/><stop offset="1" stop-color="#21A0E1"/></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear" x1="346" x2="700.902" y1="191" y2="900.799"><stop stop-color="#77C4ED"/><stop offset="1" stop-color="#20A0E1"/></linearGradient></defs>' },
			trash: { width: 24, height: 24, img: '<polyline class="stroke"  points="3 6 5 6 21 6"></polyline><path class="stroke" d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line class="stroke" x1="10" y1="11" x2="10" y2="17"></line><line class="stroke" x1="14" y1="11" x2="14" y2="17"></line>' },

			walk: { width: 512, height: 512, img: '<path class="stroke" d="M314.21,482.32,257.44,367.58l-44.89-57.39a72.82,72.82,0,0,1-10.13-37.05V144h15.67a40.22,40.22,0,0,1,40.23,40.22V367.58" style="stroke-width:32px"/><path class="stroke" d="M127.9,293.05V218.53S165.16,144,202.42,144" style="stroke-width:32px"/><line class="stroke" x1="370.1" y1="274.42" x2="304" y2="231" style="stroke-width:32px"/><line class="stroke" x1="170.53" y1="478.36" x2="224" y2="400" style="stroke-width:32px"/><circle class="stroke" cx="258.32" cy="69.48" r="37.26" style="stroke-width:32px"/>' },
			water_arrow_up: { width: 24, height: 24, img: '<path class="stroke" d="M12 3V11M12 11L9 8M12 11L15 8M2.5 14.5L3.11612 15.1161C3.68206 15.6821 4.44964 16 5.25 16C6.05036 16 6.81794 15.6821 7.38388 15.1161L7.61612 14.8839C8.18206 14.3179 8.94964 14 9.75 14C10.5504 14 11.3179 14.3179 11.8839 14.8839L12.1161 15.1161C12.6821 15.6821 13.4496 16 14.25 16C15.0504 16 15.8179 15.6821 16.3839 15.1161L16.6161 14.8839C17.1821 14.3179 17.9496 14 18.75 14C19.5504 14 20.3179 14.3179 20.8839 14.8839L21.5 15.5M2.5 19.5L3.11612 20.1161C3.68206 20.6821 4.44964 21 5.25 21C6.05036 21 6.81794 20.6821 7.38388 20.1161L7.61612 19.8839C8.18206 19.3179 8.94964 19 9.75 19C10.5504 19 11.3179 19.3179 11.8839 19.8839L12.1161 20.1161C12.6821 20.6821 13.4496 21 14.25 21C15.0504 21 15.8179 20.6821 16.3839 20.1161L16.6161 19.8839C17.1821 19.3179 17.9496 19 18.75 19C19.5504 19 20.3179 19.3179 20.8839 19.8839L21.5 20.5" stroke="#131A29"/>' },

			upload: { width: 24, height: 24, img: '<path class="stroke" d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline class="stroke" points="16 6 12 2 8 6"></polyline><line class="stroke" x1="12" y1="2" x2="12" y2="15"></line>' },
			upload_cloud: { width: 24, height: 24, img: '<polyline class="stroke" points="16 16 12 12 8 16"></polyline><line class="stroke" x1="12" y1="12" x2="12" y2="21"></line><path class="stroke" d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline class="stroke" points="16 16 12 12 8 16"></polyline>' },
			users: { width: 24, height: 24, img: '<path class="stroke" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle  class="stroke" cx="9" cy="7" r="4"></circle><path class="stroke" d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path  class="stroke" d="M16 3.13a4 4 0 0 1 0 7.75"></path>' },

			zoom_in: { width: 24, height: 24, img: '<circle class="stroke" cx="11" cy="11" r="8"></circle><line class="stroke" x1="21" y1="21" x2="16.65" y2="16.65"></line><line class="stroke" x1="11" y1="8" x2="11" y2="14"></line><line class="stroke" x1="8" y1="11" x2="14" y2="11"></line>' },
			zoom_out: { width: 24, height: 24, img: '<circle class="stroke" cx="11" cy="11" r="8"></circle><line class="stroke" x1="21" y1="21" x2="16.65" y2="16.65"></line><line class="stroke" x1="8" y1="11" x2="14" y2="11"></line>' },

			blank: { width: 24, height: 24, img: '' },
		};
		this.debug				= debug;
	}

	/**
	 * Replace all images on page to SVG images
	 */
	replaceAll()
	{
		let list = document.getElementsByTagName( 'img' );
		for( let i = 0; i < list.length; i++ ){
			let img = list[ i ];
			if( img == undefined ) continue;
			if( img.title == undefined ) continue;
			if( img.title == '' ) continue;
			if( this.images.hasOwnProperty( img.title ) == undefined ) continue;
		
			let svg = this.getSvgFromImageElement( img.title, img );

			if( svg != undefined ){
				img.replaceWith( svg );
				i--;
			}

			// let cloneElement = img.cloneNode(true);
			// img.parentNode.replaceChild( cloneElement, img );
			// img.parentNode.appendChild( svg );

			if( this.debug ) console.info( img, svg );
		}
	}

	/**
	 * Method for get svg image from image
	 * @param {String} name 
	 * @param {Boolean} backquotes 
	 * @returns DOM element
	 */
	getSvgFromImageName( name = '', backquotes = false )
	{
		if( this.debug ) console.log( 'getSvgFromImageName >:', name, backquotes );
	
		let svg = undefined;

		if( this.images.hasOwnProperty( name ) ){
			let data			= this.images[ name ];
			svg					= this.getSVG( '', data.width, data.height, data.img,  '', undefined );
		}

		if( backquotes ){
			let temObject = document.createElement( 'div' );
			temObject.appendChild( svg );
			let str = temObject.innerHTML;
			str = str.replace( /</g, '%3C' );
			str = str.replace( />/g, '%3E' );
			str = str.replace( /"/g, '\\"' );
			svg = str;
			temObject.remove();
		}

		return svg;
	}

	/**
	 * Method for get SVG element
	 * @param {String} className 
	 * @param {Integer} width 
	 * @param {Integer} height 
	 * @param {String} innerHTML 
	 * @param {String} id 
	 * @param {Function} onclick 
	 * @param {Function} onmouseover 
	 * @returns DOM element
	 */
	getSVG( className = '', width = 0, height = 0, innerHTML = '', id = '', onclick = undefined, onmouseover = undefined )
	{
		if( this.debug ) console.log( 'getSVG >:', className, width, height, innerHTML, id, onclick );

		// let svg			= this.document.createElement( 'svg' );
		let svg					= document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );
		svg.innerHTML			= innerHTML;

		// svg.setAttribute( 'xmlns', 'http://www.w3.org/2000/svg' );
		svg.setAttribute( 'class', className );
		// svg.setAttribute( 'width', width );
		// svg.setAttribute( 'height', height );
		svg.setAttribute( 'viewBox', '0 0 ' + width + ' ' + height );
		svg.setAttribute( 'fill', 'none' );
		// svg.setAttribute( 'stroke', 'var( --master-color )' );
		// svg.setAttribute( 'stroke-width', '1.5' );
		// svg.setAttribute( 'stroke-linecap', 'round' );
		// svg.setAttribute( 'stroke-linejoin', 'round' );

		if( id != '' ) svg.id = id;
		if( onclick != undefined ) svg.onclick = onclick;
		if( onmouseover != undefined ) svg.onmouseover = onmouseover;

		return svg;
	}

	/**
	 * Method for get SVG element from image element
	 * @param {String} name 
	 * @param {DOM element} imageElement 
	 * @returns DOM element
	 */
	getSvgFromImageElement( name = '', imageElement = undefined )
	{
		if( this.debug ) console.log( 'getSvgFromImageElement >:', name, imageElement );
	
		let svg = undefined;

		if( this.images.hasOwnProperty( name ) && imageElement != undefined ){
			let data			= this.images[ name ];
			svg					= this.getSVG( imageElement.className, data.width, data.height, data.img, imageElement.id, imageElement.onclick, imageElement.onmouseover );
		}

		return svg;
	}

	/**
	 * Build all images
	 * @param {DOM element} parent 
	 */
	getAllImages( parent = undefined )
	{
		if( this.debug ) console.log( 'getAllImages >:', parent );
		if( parent == undefined ) return console.log( 'parent is undefined' );
		
		let tempObject = document.createElement( 'div' );
		tempObject.className = 'flex';
		parent.appendChild( tempObject );

		for( let name in this.images ){
			let img = this.getSvgFromImageName( name );
			img.classList = 'ico';

			let text = document.createElement( 'code' );
			text.innerText = name;

			let div = document.createElement( 'div' );
			div.className = 'flex';
			parent.appendChild( div );
			div.appendChild( img );
			div.appendChild( text );
		}
	}
}



// ----- ON LOAD -----------------------------------------------
window.addEventListener( 'load', function( ev ){
	// if( typeof app == 'object' ){
	// 	if( app.hasOwnProperty( 'available' ) ){
	// 		if( !app.available.hasOwnProperty( 'SVGImages' ) ){
				
	// 		}
	// 	}
	// }
}, false);
