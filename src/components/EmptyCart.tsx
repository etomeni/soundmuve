import Box from '@mui/material/Box';
import emptyCart from "@/assets/branded/images/emptyCart.webp";


interface MyComponentProps {
    notFoundText?: string,
    containerHeight?: string,
};

const EmptyCartComponent: React.FC<MyComponentProps> = ({notFoundText = 'not found', containerHeight = '30vh'}) => {

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
            <img src={emptyCart} alt='empty cart' style={{ width: 200, height: 200 }} />
            <h4 style={{
                fontSize: 20,
                textAlign: 'center',
                margin: 0
            }}>
                {notFoundText}
            </h4>
        </Box>
    )
}

export default EmptyCartComponent;
