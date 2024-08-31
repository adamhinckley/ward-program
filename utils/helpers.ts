import { AppState } from './types';

export const initialStateForDemo: AppState = {
	bulletinData: [
		{
			bulletin: {
				title: 'Demo Ward',
				imageUrl:
					'https://assets.churchofjesuschrist.org/b6/2d/b62d1a771da211edbde1eeeeac1e92b568210c75/new_testament_footage_screenshots.jpeg',
				isTestimonyMeeting: false,
				isIntermediateMusicActive: false,
				meetingHasBabyBlessing: false,
				showBlockOne: true,
				showBlockTwo: true,
				showIntermediateMusic: true,
				presiding: 'Joseph Smith',
				conducting: 'Hyrum Smith',
				musicLeader: 'Brigham Young',
				accompanist: 'David Whitmer',
				openingHymn: '',
				openingHymnTitle: 'High on the Mountain Top',
				openingPrayer: 'Oliver Cowdery',
				babyBlessing: '',
				sacramentHymn: '',
				sacramentHymnTitle: 'While of These Emblems We Partake',
				blockOne: [],
				intermediateMusic: {},
				intermediateMusicPerformers: [],
				blockTwo: [
					{
						left: 'Speaker',
						right: 'David Whitmer',
					},
				],
				blockThree: [
					{
						left: 'Speaker',
						right: 'Porter Rockwell',
					},
				],
				closingHymn: '',
				closingHymnTitle: 'Redeemer of Israel',
				closingPrayer: 'J Golden Kimball',
				openingHymnLink:
					'https://www.churchofjesuschrist.org/study/manual/hymns/high-on-the-mountain-top?lang=eng',
				sacramentHymnLink:
					'https://www.churchofjesuschrist.org/study/manual/hymns/while-of-these-emblems-we-partake-saul?lang=eng',
				closingHymnLink:
					'https://www.churchofjesuschrist.org/study/manual/hymns/redeemer-of-israel?lang=eng',
				intermediateMusicLink: '',
				sacramentHymnNumber: '173',
				sacramentHymnNumberTitle: '',
				openingHymnNumber: '5',
				closingHymnNumber: '6',
				intermediateMusicType: 'hymn',
				intermediateHymnNumber: '8',
				intermediateHymnTitle: 'Awake and Arise',
				intermediateMusicLeftSide: '',
				intermediateMusicRightSide: '',
				intermediateHymnLink:
					'https://www.churchofjesuschrist.org/study/manual/hymns/awake-and-arise?lang=eng',
				announcements:
					'<h1 style="text-align: center"><strong>Ward Announcements</strong></h1><ul><li><p>The Addiction Recovery Program (ARP) contact David O. McKay</p></li><li><p>Empty Nesters Family Home Evenings Mondays at 6:00 PM in R.S. Room. Potluck to follow.</p></li><li><p>Ward Choir practice rehearsals on the 1st (9-4) &amp; 3rd (9-18) Wednesday of each month at 6:45 PM.</p></li><li><p>Institute will be starting back up Wednesday, September 4th at 7:30 pm in the Relief Society room for the young adults.</p></li></ul><hr><h1 style="text-align: center"><strong>Relief Society Lessons (2nd &amp; 4th)</strong></h1><ul><li><p><a target="_blank" rel="noopener noreferrer nofollow" class="underline  text-blue-800" href="https://www.churchofjesuschrist.org/study/general-conference/2024/04/41rasband?lang=eng">August 25 - “Words Matter” by Elder Rasband</a></p></li><li><p><a target="_blank" rel="noopener noreferrer nofollow" href="https://www.churchofjesuschrist.org/study/general-conference/2024/04/52godoy?lang=eng">Septem</a><a target="_blank" rel="noopener noreferrer nofollow" href="https://www.churchofjesuschrist.org/study/general-conference/2024/04/21bednar?lang=eng">ber 8 - "Call, Don\'t Fall" by Taylor G. Godoy</a></p></li><li><p><a target="_blank" rel="noopener noreferrer nofollow" href="https://www.churchofjesuschrist.org/study/general-conference/2024/04/21bednar?lang=eng">September 22 - “Be Still, and Know That I Am God” By Elder David&nbsp;A. Bednar</a></p></li></ul><hr><h1 style="text-align: center"><strong>Relief Society Activities</strong></h1><ul><li><p>September 4th – R.S. Sisters Luncheon 12:00 at the church. Wear your favorite color.</p></li></ul><hr><h1 style="text-align: center"><strong>Priesthood Lessons (2nd &amp; 4th</strong>)</h1><ul><li><p><a target="_blank" rel="noopener noreferrer nofollow" class="underline  text-blue-800" href="https://www.churchofjesuschrist.org/study/general-conference/2024/04/27cook?lang=eng">August 25 - “Be One with Christ” - Elder Quentin L. Cook</a></p></li><li><p><a target="_blank" rel="noopener noreferrer nofollow" href="https://www.churchofjesuschrist.org/study/general-conference/2024/04/18eyring?lang=eng">September 8 - "All Will Be Well Because of Temple Covenants" - President Henry B. Eyring</a></p></li><li><p><a target="_blank" rel="noopener noreferrer nofollow" href="https://www.churchofjesuschrist.org/study/general-conference/2024/04/15dushku?lang=eng">September 22 - "Pillars and Rays" - Elder Alexander Dushku</a></p></li><li><p><a target="_blank" rel="noopener noreferrer nofollow" href="https://www.churchofjesuschrist.org/study/general-conference/2024/04/16soares?lang=eng">October 13 - "Covenant Confidence through Jesus Christ" - Elder Ulisses Soares</a></p></li><li><p><a target="_blank" rel="noopener noreferrer nofollow" href="https://www.churchofjesuschrist.org/study/general-conference/2024/04/55andersen?lang=eng">October 27 - "Temples, Houses of the Lord Dotting the Earth" - Elder Neil L. Anderson</a></p></li></ul><hr><h1 style="text-align: center"><strong>Sunday School Lessons</strong></h1><ul><li><p><a target="_blank" rel="noopener noreferrer nofollow" class="underline  text-blue-800" href="https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/34?lang=eng">August 19–25: Alma 53–63</a></p></li><li><p><a target="_blank" rel="noopener noreferrer nofollow" class="underline  text-blue-800" href="https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/35?lang=eng">August 26–September 1: Helaman 1–6</a></p></li><li><p><a target="_blank" rel="noopener noreferrer nofollow" class="underline  text-blue-800" href="https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/36?lang=eng">September 2–8: “Remember the Lord”</a></p></li><li><p><a target="_blank" rel="noopener noreferrer nofollow" class="underline  text-blue-800" href="https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/37?lang=eng">September 9–15: “Glad Tidings of Great Joy”</a></p></li><li><p><a target="_blank" rel="noopener noreferrer nofollow" href="https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/38?lang=eng">September 16–22: “Lift Up Your Head and Be of Good Cheer”</a></p></li><li><p><a target="_blank" rel="noopener noreferrer nofollow" href="https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/39?lang=eng">September 23–29: “Arise and Come Forth unto Me”</a></p></li></ul><hr><h1 style="text-align: center"><strong>Primary Announcements</strong></h1><ul><li><p>Primary Activity Night on the 2nd (8-14) &amp; 4th (8-28) Wednesday at 6:30 PM.</p></li></ul><hr><h1 style="text-align: center"><strong>Ward Focus Temple Corner</strong></h1><ul><li><p>For this year we would like to encourage members to focus on developing Christ like attributes. This month we are focusing on Humility.</p></li><li><p>To be humble is to recognize gratefully our dependence on the Lord—to understand that we have constant need for His support. Humility is an acknowledgment that our talents and abilities are gifts from God. It is not a sign of weakness, timidity, or fear; it is an indication that we know where our true strength lies. We can be both humble and fearless. We can be both humble and courageous. Jesus Christ is our greatest example of humility. During His mortal ministry, He always acknowledged that His strength came because of His dependence on His Father. He said: “I can of mine own self do nothing. … I seek not mine own will, but the will of the Father which hath sent me.” The Lord will strengthen us as we humble ourselves before Him. James taught: “God resisteth the proud, but giveth grace unto the humble. … Humble yourselves in the sight of the Lord, and he shall lift you up.”</p></li></ul><hr><h1 style="text-align: center"><strong>Tupelo Stake Announcements</strong></h1><ul><li><p>Tupelo Stake General Priesthood Meeting - Sunday August 25th 3:00 PM - Tupelo Stake Center (1085 South Thomas Street)</p></li><li><p>All men and boys regardless of age are invited to attend.</p></li><li><p>Refreshments will be served following the meeting.</p></li><li><p>You are invited to listen and ponder the words of hymn #1004 "I will walk with Jesus" in preparation for the meeting.</p></li><li><p>Doctrine and Covenants 84:20-21 "Therefore, in the ordinances thereof, the power of godliness is manifest. And without the ordinances thereof, and the authority of the priesthood, the power of godliness is not manifest unto men in the flesh;"</p><hr></li><li><p>Tupelo Stake Fall Festival - October 19, 2024 - Save the date!</p></li></ul><hr><h1 style="text-align: center"><strong>Building Cleaning Schedule</strong></h1><ul><li><p>Please sign up for either the even months or the odd months for the year. Then each Saturday the building will be open for cleaning with a list of assignments. Come and select a few assignments put your name next to them. When completed check the box confirming it has been done.</p></li></ul><hr><h1 style="text-align: center"><strong>Family History Corner</strong></h1><p>Our readings in Come, Follow Me this week are in a time of war between the Nephites and the Lamanites. What do you know of your ancestors and relatives who may have fought to preserve freedoms and way of life? What discovery clues do their records contain?<br><br>While working with my mother on our own family history, it was the military records of a family member which allowed us to verify and confirm several pieces of his family\'s story. The records verified his various residences, confirmed that he was single throughout his life, and mentioned his next of kin so that we could clearly see that it was indeed our family member and not another soldier with the same name. (Lani Jackson)</p><p><br></p><p>The <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.familysearch.org/en/wiki/United_States_Military_Records">Family Search United States Military Records</a> wiki is one source that can help you research these records.</p>',
				blockFour: [
					{
						left: 'Bishop',
						right: '000-000-0000',
					},
				],
				wardContacts: [
					{
						left: 'Bishop Dali',
						right: '000-000-0000',
					},
					{
						left: '1st Counselor Picasso',
						right: '000-000-0000',
					},
					{
						left: '2nd Counselor Rembrandt',
						right: '000-000-0000',
					},
					{
						left: 'Stake Patriarch van Gouch',
						right: '000-000-0000',
					},
					{
						left: 'Ward Clerk Bro Hopper',
						right: '000-000-0000',
					},
					{
						left: 'Relief Society President Mona Lisa',
						right: '000-000-0000',
					},
					{
						left: 'Executive Secretary Claude Monet',
						right: '000-000-0000',
					},
					{
						left: 'Elders Quorum President Michelangelo',
						right: '000-000-0000',
					},
				],
			},
			stake: '',
			ward: '',
			id: 'demo',
		},
	],
};

export const isDevEnv = process.env.NODE_ENV === 'development';
