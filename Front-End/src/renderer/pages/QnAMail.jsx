import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Paper, FormControl, InputLabel, Select, MenuItem, Fab, Grid, TextField } from '@material-ui/core';
import { List,  Divider, CardMedia } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    list: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        minHeight: 360,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    spacer: {
        flex: '1 1 auto',
    },
    fab: {
        width: 70,
    },
    imagecrop: {
        width: 130,
    },
}));
const mylistStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 330,
    },
    listSection: {
        backgroundColor: 'inherit',
        padding: 0,
    },
    image: {
        height: 40,
    },
    fullimage: {
        height: '90%',
    },
    textfiled: {
        maxWidth: 300,
    },
    item: {
        padding: 10,
    },
}));

function TabPanel(props) {
    const { children, value, index } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {children}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default function QnAMail(props){
    const { sendingImagePath } = props;
    const classes = useStyles();
    const classes2 = mylistStyles();
    const [value, setValue] = React.useState(null);
    function handleChange(event) {
        setValue(event.target.value);
    }
    return (
        <div className={classes.root}>
            {sendingImagePath}
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                {/* 첫번째 줄 */}
                <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="Tabs-simple">구 분</InputLabel>
                        <Select
                            value={value}
                            onChange={handleChange}
                            inputProps={{
                                name: 'Tabs',
                                id: 'Tabs-simple',
                            }}
                        >
                            <MenuItem value={1}>분류구분 추가신청</MenuItem>
                            <MenuItem value={2}>오탐지 수정요청</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <div className={classes.spacer}/>
                <Fab variant="extended" className={classes.fab}>전  송</Fab>
                {/* 두번째 줄 */}
                <Grid item xs={9}>
                    <TextField
                        label="이미지 경로"
                        style={{ margin: 8 }}
                        placeholder="경로"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={''}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Fab variant="extended" disabled={value !== 2? true : false} className={classes.imagecrop}>이미지 자르기</Fab>
            </Grid>
            <Paper className={classes.list}>
                <TabPanel value={value} index={null}>{ /* 문의 초기 화면 */ }
                    구분을 선택해 주세요.
                </TabPanel>
                <TabPanel value={value} index={1}>{ /* 분류구분 추가신청 화면 */ }
                    <Grid container zeroMinWidth className={classes2.item} >
                        <Grid xs={6} item><CardMedia className={classes2.fullimage} /></Grid> //teimage
                        <Grid xs={6} item>
                            <TextField id={`classification-require`} label="이미지 분류를 위한 문서종류를 적으세요" multiline
                                       rows="14" fullWidth margin="normal" variant="filled"/>
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={2}>{ /* 오탐지 수정요청 화면 */ }
                    <List className={classes2.root} >
                        {
                            ['Pattern.png','Bookmark.png','Find.png','Identification.png','SearchIcon.png'].map(item =>
                                <div>
                                    <Grid container divider zeroMinWidth className={classes2.item}>
                                        <Grid xs={6} item><CardMedia className={classes2.image} image={`C:/Users/HYS/Desktop/electronReactTest/src/pages/${item}`}/></Grid>
                                        <Grid xs={6} item>
                                            <TextField id={`submit-text-${item}`} label="이미지 내의 텍스트를 적어주세요" multiline
                                                       rows="3" fullWidth margin="normal" variant="filled"/>
                                        </Grid>
                                    </Grid>
                                    <Divider/>
                                </div>
                            )
                        }
                    </List>
                </TabPanel>
            </Paper>
        </div>
    )
}
