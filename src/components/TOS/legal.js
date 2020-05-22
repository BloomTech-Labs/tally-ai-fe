import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
});

function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const Policy = (props) => {

    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(props.match.params.doc === "tos" ? 1 : 0);

    useEffect(() => {
        setValue(props.match.params.doc === "tos" ? 1 : 0)
    }, [props.match.params.doc])

    const handleChange = (event, newValue) => {
    setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
      };

    return (
        <div>
        <div style={{marginTop: '75px', height: '20vh', background: 'linear-gradient(145.23deg, #BBDEFB 4.5%, #E4F3FF 117.03%, #F5FBFF 117.04%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px'}}>
            <h1>Legal</h1>
        </div>
        <Paper className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
            <Tab label="Privacy Policy" {...a11yProps(0)} />
            <Tab label="Terms Of Service" {...a11yProps(1)} />
            </Tabs>
        </Paper>

        <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
        >
  
            <TabPanel value={value} index={0} dir={theme.direction}>
                <div style={{textAlign: "left", paddingLeft: '10%', paddingRight: '10%', paddingBottom: '3', paddingtop: '3%', fontWeight: 'bold', minHeight: "70vh"}}>
                    <h4>Privacy Policy</h4> 
                    <p>Your privacy is important to us. It is Tally AI's policy to respect your privacy regarding any information we may collect from you across our website, http://tally-ai.com, and other sites we own and operate. We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>
                    <p>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.</p> 
                    <p>We don’t share any personally identifying information publicly or with third-parties, except when required to by law.</p> 
                    <p>Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.</p> 
                    <p>You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.</p>
                    <p>Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.</p> 
                    <p>This policy is effective as of 26 January 2020.</p>
                </div> 
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                <div style={{textAlign: "left", paddingLeft: '10%', paddingRight: '10%', paddingBottom: '3%', paddingtop: '3%', fontWeight: 'bold'}}>
                    <h4>Tally AI Terms of Service </h4> 
                    <h4>1. Terms</h4> 
                    <p>By accessing the website at http://tally-ai.com, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.</p> 
                    <h4>2. Use License</h4> <p>Permission is granted to temporarily download one copy of the materials (information or software) on Tally AI's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose, or for any public display (commercial or non-commercial); attempt to decompile or reverse engineer any software contained on Tally AI's website; remove any copyright or other proprietary notations from the materials; or transfer the materials to another person or "mirror" the materials on any other server. This license shall automatically terminate if you violate any of these restrictions and may be terminated by Tally AI at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.</p> 
                    <h4>3. Disclaimer </h4> 
                    <p>The materials on Tally AI's website are provided on an 'as is' basis. Tally AI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Further, Tally AI does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.</p>
                    <h4>4. Limitations </h4> <p>In no event shall Tally AI or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Tally AI's website, even if Tally AI or a Tally AI authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.</p> 
                    <h4>5. Accuracy of materials </h4> <p>The materials appearing on Tally AI's website could include technical, typographical, or photographic errors. Tally AI does not warrant that any of the materials on its website are accurate, complete or current. Tally AI may make changes to the materials contained on its website at any time without notice. However Tally AI does not make any commitment to update the materials.</p>
                    <h4>6. Links </h4> <p>Tally AI has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Tally AI of the site. Use of any such linked website is at the user's own risk.</p> 
                    <h4>7. Modifications </h4> <p>Tally AI may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</p> 
                    <h4>8. Governing Law </h4> <p>These terms and conditions are governed by and construed in accordance with the laws of California and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
                </div> 
            </TabPanel>
        </SwipeableViews>
        </div>
    );
}

export default Policy;