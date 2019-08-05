import React, {useEffect, useState} from 'react';
import {ipcRenderer} from 'electron';
import {Divider, Grid, List, makeStyles, TextField} from '@material-ui/core';

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
        height: 300,
        width: '100%',
    },
    textfiled: {
        maxWidth: 300,
    },
    item: {
        padding: 10,
    },
}));

export default function test2() {
    console.log('Test2 rendering...');
    const [value, setValue] = useState([]);
    useEffect(() => {
        ipcRenderer.once('TEST3',(event,result)=>{
            console.log('body listening.....');
            setValue([...value,result]);
            console.log(value);
        })}
    );
    const classes2 = mylistStyles();
    return (
    <List className={classes2.root}>
        {
            value.map(item =>
                <div>
                    <Grid container divider zeroMinWidth className={classes2.item}>
                        <Grid xs={6} item>
                            {item}
                        </Grid>
                    </Grid>
                    <Divider/>
                </div>
            )
        }
    </List>
    )
}
