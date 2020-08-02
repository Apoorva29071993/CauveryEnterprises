import React from 'react';
import {makeStyles , useTheme} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import history from '../assets/history.svg';
import Avatar from '@material-ui/core/Avatar';
import profile from '../assets/apoorva.jpg';
import yearbook from '../assets/yearbook.svg';
import puppy from '../assets/puppy.svg';
import Hidden from '@material-ui/core/Hidden';
import CallToAction from './ui/CallToAction.js';

const useStyles = makeStyles(theme => ({
		missionStatement : {
			fontStyle : "italic",
			fontWeight : 300 ,
			fontSize  : "1.5rem" ,
			maxWidth : "50em" ,
			lineHeight : 1.4
		},
		rowContainer : {
		paddingLeft : "5em",
		paddingRight : "5em",
		[theme.breakpoints.down("sm")] : {
			paddingLeft : "1.5em",
			paddingRight : "1.5em",
		}
		},
		avatar : {
			height : "25em" ,
			width : "25em",
			[theme.breakpoints.down("sm")] : {
				height : "20em" ,
				width : "20em" ,
				maxHeight : 300 ,
				maxWidth : 300
			}
		}
}));

export default function AboutUs(props) {

			const classes = useStyles();
			const theme = useTheme();
			const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
			const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
			const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

			return (

					<Grid container direction="column" >
						//1st row starts here 
						<Grid item className={classes.rowContainer} style={{marginTop : matchesMD ? "1em" : "2em"}}>
							<Typography align="center" variant="h2">
								About Us
							</Typography>
						</Grid>
						<Grid item container justify="center" className={classes.rowContainer} style={{marginTop : "3em"}}>
							<Typography variant="h4" align="center" className ={classes.missionStatement}>
								Whether it be person to person, business to consumer, or an individual to their interests, 
								technology is meant to bring us closer to what we care about in the best way possible. Arc Development will use that principle
								to provide fast, modern, inexpensive, and aesthetic software to the Midwest and beyond.
							</Typography>
						</Grid>

						//2nd row history starts here 
						<Grid item container className={classes.rowContainer} 
						direction={matchesMD ? "column" : "row"} alignItems={matchesMD ? "center" : undefined} 
						justify="space-around" style={{marginTop : "10em" , marginBottom : "10em"}}>
						  <Grid item >	
								<Grid item container direction="column" lg style={{maxWidth : "35em"}}>
									<Grid item>
										<Typography variant="h2" align={matchesMD ? "center" : undefined } gutterBottom>
										 History
										</Typography>
									</Grid>
									<Grid item>
										<Typography variant="body1" align={matchesMD ? "center" : undefined } paragraph style={{fontWeight : 700 , fontStyle : "italic"}}>
										 We’re the new kid on the block.
										</Typography>
									</Grid>
									<Grid item>
										<Typography variant="body1" align={matchesMD ? "center" : undefined } paragraph>
										 Founded in 2019, we’re ready to get our hands on the world’s business problems.
										</Typography>
									</Grid>
									<Grid item>
										<Typography variant="body1" align={matchesMD ? "center" : undefined } paragraph>
										 It all started with one question: Why aren’t all businesses using available technology?
										There are many different answers to that question: economic barriers, social barriers, educational barriers,
										 and sometimes institutional barriers.
										</Typography>
									</Grid>
									<Grid item>
										<Typography variant="body1" align={matchesMD ? "center" : undefined } paragraph>
										 We aim to be a powerful force in overcoming these obstacles. Recent developments in software engineering and computing power, 
										 compounded by the proliferation of smart phones, has opened up infinite worlds of possibility. Things that have always been done by
										  hand can now be done digitally and automatically, and completely new methods of interaction are created daily. Taking full advantage of 
										  these advancements is the name of the game.
										</Typography>
									</Grid>
									<Grid item>
										<Typography variant="body1" align={matchesMD ? "center" : undefined } paragraph>
										 All this change can be a lot to keep up with, and that’s where we come in.
										</Typography>
									</Grid>
								</Grid>
						   </Grid>	

						   		  <Grid item>	
										<Grid item container justify="center" lg>
											<img src={history} alt="history with" style={{maxHeight : matchesMD ? 200 : "22em" }}/>
										</Grid>
								  </Grid>
						</Grid>


						//3rd row Apoorva and other details starts here
						<Grid item container direction="column" 
						className={classes.rowContainer}  alignItems="center" style={{marginBottom : "15em"}}>
							<Grid item>
								<Typography variant="h4" align="center" gutterBottom>
									Team
								</Typography>
							</Grid>
							<Grid item>
								<Typography variant="body1" paragraph align="center">
									Mr.Apoorva A. Jakati, Developer
								</Typography>
								<Typography variant="body1" paragraph align="center">
									I need to be React Developer.
								</Typography>
							</Grid>
							<Grid item>
								<Avatar alt="founder" src={profile} className={classes.avatar}/>
							</Grid>
							

							//Yearbook and other stuff
							<Grid item container justify={matchesMD ? "center" : undefined}>


							<Hidden lgUp>
								<Grid item lg style={{maxWidth : "45em" , padding : "1.25em"}}>
									<Typography variant="body1" paragraph align="center">
									I taught myself basic coding from a library book in third grade, and ever since
									 then my passion has solely been set on learning — learning about computers,
									 learning mathematics and philosophy, studying design, always just learning.
									</Typography>
									<Typography variant="body1" paragraph align="center">
									Now I’m ready to apply everything I’ve learned, and to help others with the intuition I have developed.
									</Typography>
								</Grid>
							</Hidden>

								<Grid item container direction="column" lg alignItems={matchesMD ? "center" : undefined} 
								style={{marginBottom : matchesMD ? "2.5em" : 0}}>
									<Grid item >
										<img src={yearbook} alt="yearbook page" style={{maxWidth : matchesMD ? 300 : undefined}}/>
									</Grid>
									<Grid item >
										<Typography variant="caption">
										A page that need to be replaced
										</Typography>
									</Grid>
								</Grid>

								<Hidden mdDown>
								<Grid item lg style={{maxWidth : "45em" , padding : "1.25em"}}>
									<Typography variant="body1" paragraph align="center">
									I taught myself basic coding from a library book in third grade, and ever since
									 then my passion has solely been set on learning — learning about computers,
									 learning mathematics and philosophy, studying design, always just learning.
									</Typography>
									<Typography variant="body1" paragraph align="center">
									Now I’m ready to apply everything I’ve learned, and to help others with the intuition I have developed.
									</Typography>
								</Grid>
								</Hidden>

								<Grid item container direction="column" lg alignItems={matchesMD ? "center" : "flex-end"} >
									<Grid item >
										<img src={puppy} alt="grey spotted puppy" style={{maxWidth : matchesMD ? 300 : undefined}}/>
									</Grid>
									<Grid item >
										<Typography variant="caption">my miniature dapple dachshund, Sterling</Typography>
									</Grid>
								</Grid>

							</Grid>
						</Grid>


						//4th row starts here
						<Grid item >
							<CallToAction setValue={props.setValue}/>
						</Grid>








					</Grid>

					);

	}