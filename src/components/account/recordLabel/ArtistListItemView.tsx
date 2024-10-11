import { recordLabelArtistInterface } from '@/constants/typesInterface'
import { useRecordLabelFn } from '@/hooks/recordLabel/useRecordLabelFn'
import { stringAvatar } from '@/util/resources'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React from 'react'


interface _Props {
    recordLabelArtist: recordLabelArtistInterface[],
}

const ArtistListItemView: React.FC<_Props> = ({
    recordLabelArtist
}) => {
    const { handleNavigation } = useRecordLabelFn();


    return (
        <Grid container spacing={3}>
            {
                recordLabelArtist?.slice(0, 6).map((item, i) => (
                    <Grid item xs={6} sm={4} md={3} lg={2} key={i}>
                        <Stack alignItems="center" 
                            onClick={() => handleNavigation(item)} 
                            sx={{ cursor: "pointer" }}
                        >
                            <Avatar
                                alt={`${item.artistName} image`}
                                src={item.artistAvatarUrl}
                                // variant="rounded"
                                aria-label={item.artistName}
                                sx={{ 
                                    boxShadow: "0px 4px 8px -1px rgba(0, 0, 0, 0.1)",
                                    // bgcolor: stringToColor(project.title),
                                    width: "110px",
                                    height: "110px",
                                    // mb: "0.5rem",
                                    // p: 1
                                }}
                                children={<Typography sx={{
                                    fontSize: "15px",
                                    fontWeight: "bold"
                                }}>{stringAvatar(item.artistName)}</Typography>}
                            />
    
                            <Typography variant='h4' component="h4"
                                sx={{
                                    fontWeight: '900',
                                    fontSize: '23.73px',
                                    lineHeight: '24.24px',
                                    letterSpacing: '-0.59px',
                                    mt: '26px'
                                }}
                            >{item.artistName}</Typography>

                            <Typography variant='body2'
                                sx={{
                                    fontWeight: "400",
                                    fontSize: '14.24px',
                                    lineHeight: '10.68px',
                                    letterSpacing: '-0.59px',
                                    color: '#666666',
                                    mt: '13px'
                                }}
                            >{ item.songCount } Songs</Typography>
                        </Stack>
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default ArtistListItemView