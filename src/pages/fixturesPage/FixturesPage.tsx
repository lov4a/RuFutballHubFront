import { FixtureTicker } from '../../features/fixtureTicker/ui/FixtureTicker'


export function FixturesPage(){
    return(
        <div>
            <h2>Календарь</h2>
            
            <FixtureTicker
            seasonId={"598c15d1-e730-4365-8617-9bd9c24e7553"}
            initialFrom={1}
            initialTo={30}
            fullWidth/>
        </div>


    )
}
