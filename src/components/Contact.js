import React, {useState} from 'react';
import {makeStyles , useTheme} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import background from '../assets/background.jpg';
import phoneIcon from '../assets/phone.svg';
import emailIcon from '../assets/email.svg';
import airplane from '../assets/send.svg';
import {Link} from 'react-router-dom';
import ButtonArrow from  "./ui/buttonArrow";
import mobileBackground from '../assets/mobileBackground.jpg';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import ContactModel from '../models/contact';

const useStyles = makeStyles(theme => ({
	  background : {
      backgroundImage : `url(${background})`,
      backgroundPosition : "center" ,
      backgroundSize : "cover" ,
      backgroundRepeat : "no-repeat",
      height : "60em",
      paddingBottom : "10em",
      [theme.breakpoints.down("md")] : {
       backgroundImage : `url(${mobileBackground})`
    }
    },
    learnButton : {
    ...theme.typography.learnButton,
    fontSize : "0.7rem",
    height : 35,
    padding : 5,
    [theme.breakpoints.down("md")] : {
          marginBottom : "2em"
    }
   },
    estimateButton :{
    ...theme.typography.estimate ,
    borderRadius : 50 ,
    height : 80,
    width : 205 ,
    backgroundColor : theme.palette.common.orange,
    fontSize : "1.5rem",
    marginRight : "5em",
    marginLeft : "2em",
    "&:hover" : {
      backgroundColor : theme.palette.secondary.light
    },
    [theme.breakpoints.down("md")] : {
        marginLeft : 0,
        marginRight : 0
    }
  },
   message : {
   	border : `2px solid ${theme.palette.common.blue}`,
   	marginTop : "5em",
   	borderRadius : 5 
   },
   sendButton : {
   	...theme.typography.estimate ,
   	borderRadius : 50 ,
   	height : 45 ,
   	width : 245 ,
   	fontSize : '1rem' ,
   	backgroundColor : theme.palette.common.orange,
   	"&:hover" : {
      backgroundColor : theme.palette.secondary.light
    } ,
    [theme.breakpoints.down("sm")] : {
        height : 40 ,
        width : 225
    }
   }
}));

export default function Contact(props) {
			const classes = useStyles();
			const theme = useTheme();

			const [name , setName] = useState('');

			const [email , setEmail] = useState('');
			const [emailHelper , setemailHelper] = useState('');

			const [phone , setPhone] = useState('');
			const [phoneHelper , setphoneHelper] = useState('');

			const [message , setMessage] = useState('');

			const [open , setOpen] = useState(false);

			const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
			const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
			const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

			const [loading , setLoading] = useState(false);

			const [alert , setAlert] = useState({open : false , message : "" , backgroundColor : ""})


			const onChange = event => {
				let valid ;

				switch(event.target.id) {
					case 'email' : setEmail(event.target.value);
					 					valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)
					 					if (!valid)
					 					 {
					 					 	setemailHelper("Invalid Email");
					 					 }
					 					 else {
					 					 	setemailHelper("");
					 					 }
					 					 break;
					case 'phone' : setPhone(event.target.value);
					 					valid = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(event.target.value)
					 					if (!valid)
					 					 {
					 					 	setphoneHelper("Invalid Phone Number");
					 					 }
					 					 else {
					 					 	setphoneHelper("");
					 					 }
					 					 break; 					 

					 		default : break;			 
				}
			}


			const saveUserToDb = async (contactDetails) => {
				console.log(" Step 11 " + contactDetails.name) ;
				const contactModel = new ContactModel(contactDetails)
				console.log("saveUserToDb called = " + contactDetails);
					try {
						await contactModel.save()
						console.log("Save Successfull");		
					} catch (e) {
						console.log("Save Failed");	
					}
			}

			const onConfirm = () => {
				setLoading(true);
				
				axios.get( "https://us-central1-material-ui-course-828f0.cloudfunctions.net/sendMail" ,
				   {params : {
				   		name : name ,
				   		email : email ,
				   		phone : phone ,
				   		message : message
				   }}
				   )
				  .then(response => {


					//Save to MongoDB start  
					console.log(" Step 1");	
					saveUserToDb({name : name , 
						email : email ,phone : phone 
						, message : message});
					console.log(" Step 2");	
					//Save to MongoDB end  

				  	setLoading(false);
				  	setOpen(false);
				  	setName("");
				  	setEmail("");
				  	setPhone("");
				  	setMessage("");
				  	setAlert({
				  		open : true ,
				  		message : "Message sent successfully",
				  		backgroundColor : "#4BB543"
					  });
					  
				  })
				  .catch(error => {
				  	setLoading(false);
				  	setAlert({
				  		open : true ,
				  		message : "Something went wrong",
				  		backgroundColor : "#FF3232"
				  	});
				  } )
			};

			const buttonContents = (
					<React.Fragment>
						Send Message<img src={airplane} alt="airplane" style={{marginLeft : "1em"}}/>
					</React.Fragment>
				);

			
			return (
					<Grid container direction="row" >

				<Grid item container direction="column" justify="center"
				 lg={4} xl={3} style={{marginBottom : matchesMD ? "5em" : 0 , marginTop : matchesSM ? "1em" : matchesMD ? "5em" : 0	}} 
				 alignItems="center">
					<Grid item>
						<Grid container direction="column">

									<Grid item >
								<Typography variant="h2" style={{lineHeight : 1}} align={matchesMD ? "center" : undefined}>Contact Us</Typography>
								<Typography variant="body1" style={{color : theme.palette.common.blue}} align={matchesMD ? "center" : undefined}>We are waiting.</Typography>
							       </Grid>

								<Grid item container style={{marginTop : "2em"}}>
									<Grid item >
										<img src={phoneIcon} alt="phone icon" style={{marginRight : "0.5em"}} />
									</Grid>
									<Grid item >
										<Typography variant="body1" style={{color : theme.palette.common.blue , fontSize : "1rem"}}>
										<a href="tel:555555555" style={{textDecoration : "none" , color : "inherit"}}>(080) 222-6666</a>
										</Typography>
									</Grid>
								</Grid>

								<Grid item container style={{marginBottom : "2em"}}>
									<Grid item >
										<img src={emailIcon} alt="email icon" style={{marginRight : "0.5em" , verticalAlign : "bottom"}} />
									</Grid>
									<Grid item >
										<Typography variant="body1" style={{color : theme.palette.common.blue , fontSize : "1rem"}}>
										<a href="mailto:jakky@gmail.com" style={{textDecoration : "none" , color : "inherit"}}>jakky@gmail.com</a>
										</Typography>
									</Grid>
								</Grid>

								<Grid item container direction="column" style={{width : "20em"}}>
									<Grid item style={{marginBottom : "0.5em"}}>
										<TextField fullWidth label="Name" id="name" 
										value={name} onChange={(event) => setName(event.target.value)}/>
									</Grid>
									<Grid item style={{marginBottom : "0.5em"}}>	
										<TextField fullWidth label="Email" id="email" 
										error={emailHelper.length !== 0} helperText={emailHelper}
										value={email} onChange={onChange}/>
									</Grid>	
									<Grid item style={{marginBottom : "0.5em"}}>
										<TextField fullWidth label="Phone" id="phone" 
										error={phoneHelper.length !== 0} helperText={phoneHelper}
										value={phone} onChange={onChange}/>
									</Grid>
								</Grid>

								<Grid item container style={{width : "20em"}}>
									<TextField id="message" InputProps={{disableUnderline : true}} multiline rows={10} className={classes.message}
										value={message} placeholder="Tell us more about your project" onChange={(event) => setMessage(event.target.value)}/>	
								</Grid>

								<Grid item container justify="center" style={{marginTop : "2em"}}>
									<Button disabled={name.length === 0 || message.length === 0 || phoneHelper.length !== 0 || emailHelper.length !== 0 } 
									   variant="contained" className={classes.sendButton} onClick={() => setOpen(true)}>
										{buttonContents}
									</Button>
								</Grid>

					   </Grid>
					</Grid>
				</Grid>	


					<Dialog style={{zIndex : 1302}} fullScreen={matchesSM} open={open} onClose={() => setOpen(false)} 
					PaperProps={{
						style : {
							paddingTop : matchesXS ? "1em" : "5em" ,
						   paddingBottom : matchesXS ? "1em" : "5em" ,
						   paddingLeft : matchesXS ? 0 : matchesSM ? "5em" : matchesMD ? "15em" : "25em" ,
						   paddingRight : matchesXS ? 0 : matchesSM ? "5em" : matchesMD ? "15em" : "25em"
						    }
						 }}
						 >
						<DialogContent>
							<Grid container direction="column">
								<Grid item>
									<Typography align="center" variant="h4" gutterBottom>Confirm Message</Typography>
								</Grid>
									<Grid item style={{marginBottom : "0.5em"}}>
										<TextField fullWidth label="Name" id="name" 
										value={name} onChange={(event) => setName(event.target.value)}/>
									</Grid>
									<Grid item style={{marginBottom : "0.5em"}}>	
										<TextField fullWidth label="Email" id="email" 
										error={emailHelper.length !== 0} helperText={emailHelper}
										value={email} onChange={onChange}/>
									</Grid>	
									<Grid item style={{marginBottom : "0.5em"}}>
										<TextField fullWidth label="Phone" id="phone" 
										error={phoneHelper.length !== 0} helperText={phoneHelper}
										value={phone} onChange={onChange}/>
									</Grid>
									<Grid item style={{width : matchesSM ? "100%" : "20em"}}>
									<TextField id="message" fullWidth InputProps={{disableUnderline : true}} multiline rows={10} className={classes.message}
										value={message} onChange={(event) => setMessage(event.target.value)}/>	
								   </Grid>
							</Grid>
							<Grid item container direction={matchesSM ? "column" : "row"} alignItems="center" style={{marginTop : "2em"}}>
									<Grid item >
										<Button style={{fontWeight : 300}} color="primary" onClick={() => setOpen(false)}>
											Cancel
										</Button>
									</Grid>
									<Grid item >
										<Button disabled={name.length === 0 || message.length === 0 || phoneHelper.length !== 0 || emailHelper.length !== 0 } 
										   variant="contained" className={classes.sendButton} onClick={onConfirm}>
											{loading ? <CircularProgress size={30}/> : buttonContents}
										</Button>
									</Grid>
								</Grid>
						</DialogContent>
					</Dialog>
							

					<Snackbar open={alert.open} message={alert.message} 
					ContentProps={{style : {backgroundColor : alert.backgroundColor}}}
					anchorOrigin={{vertical : "top" , horizontal : "center"}} 
					onClose={() => setAlert({...alert , open :false })}
					autoHideDuration={4000} />


					<Grid item container className={classes.background} lg={8} xl={9}
					 direction={matchesMD ? "column" : "row"}  alignItems="center" justify={matchesMD ? "center" : undefined}>
							<Grid item style={{ marginLeft : matchesMD ? 0 : "3em" , textAlign : matchesMD ? "center" : "inherit"}}>
		                		  <Grid container direction="column">
		                        	<Grid item>
			                          <Typography align={matchesMD ? "center" : undefined} variant="h2" >
			                            Simple Software.<br/> Revolutionary Results.
			                          </Typography>
			                          <Typography align={matchesMD ? "center" : undefined} variant="subtitle2" style={{fontSize : "1.5rem"}}>
			                            Take Advantage of 21st Century.
			                          </Typography>

			                          <Grid container justify={matchesMD ? "center" : undefined} item >
			                            <Button component={Link} to="/revolution" onClick={() => {props.setValue(2)}} variant="outlined" className={classes.learnButton}>
			                                <span style={{marginRight : 5}}>Learn More</span>
			                                <ButtonArrow width={10} height={10} fill={theme.palette.common.blue}/>
			                            </Button>
			                          </Grid>
		                           </Grid>
		               		     </Grid>
	          			    </Grid>

					        <Grid item >
					             <Button variant="contained" component={Link} to="/estimate" onClick={() => {props.setValue(5)}} className={classes.estimateButton}>Free estimate</Button>
					        </Grid>
					</Grid>




				</Grid>
				   );
}



