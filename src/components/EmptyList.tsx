import Box from '@mui/material/Box';
import emptyImg from '@/assets/images/empty.png';
import { useSettingStore } from '@/state/settingStore';

interface MyComponentProps {
    notFoundText?: string,
    containerHeight?: string,
};

const EmptyListComponent: React.FC<MyComponentProps> = ({notFoundText = 'not found', containerHeight = '30vh'}) => {
    const darkTheme = useSettingStore((state) => state.darkTheme);

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: 'center',
            justifyContent: 'center',
            // marginVertical: '20%',
            textAlign: "center",
            width: "100%",
            height: containerHeight
        }}>
            <img src={emptyImg} alt='empty image' style={{ width: 200, height: 200 }} />
            <h4 style={{
                color: darkTheme ? "#fff" : '#272727',
                fontSize: 20,
                textAlign: 'center',
                margin: 0
            }}>
                {notFoundText}
            </h4>
        </Box>
    )
}

export default EmptyListComponent;
