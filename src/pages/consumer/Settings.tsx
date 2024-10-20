import Drawer from '../../components/CDrawer'

const Settings = () => {
    return (
        <div className="w-full h-screen flex">
            <Drawer/>
            <div className="flex-1 flex flex-col items-center justify-center py-8 bg-[#f2f2f2]">
                <h1 className="text-5xl">In Development</h1>
            </div>
        </div>
    );
}
 
export default Settings;