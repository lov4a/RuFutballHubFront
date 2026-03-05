import { FixtureTicker } from '../../features/fixtureTicker/ui/FixtureTicker'

const SEASON_ID = import.meta.env.VITE_SEASON_ID as string

export function FixturesPage(){
    return(
        <div>
            <h2 style={{marginTop:'0'}}>RFH Календарь</h2>
            
            <FixtureTicker
            seasonId={SEASON_ID}
            fullWidth/>
        </div>


    )
}
