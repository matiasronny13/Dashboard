import { SiteInfo } from '../../pages/webCollection/WebCollection';
import './listView.scss'

type TProps = {
    itemList: SiteInfo[];
    tagList: Map<number, string>;
    onItemDelete: (id:string)=>void;
}

const ListView = ({itemList, tagList, onItemDelete}: TProps) => {
    return (<div className='listView'>
        <div className='listBox'>
            {itemList.map(item => (<a className='listItem' href={item.url} target="_blank">
                <div className='itemTitle'>
                    <img className='itemFavicon' title={item.id} src={`/dashboard/thumbnail/${item.id}.ico`}></img> 
                    <span>{item.title}</span>
                </div>
                <div className='mainPanel'>
                    {/* <img title={item.id} src="chrome-extension://pebphngoiaghbmhhipdkacbeflddpacb/_favicon/?pageUrl=https://www.ritsumei.ac.jp/~akitaoka/index-e.html&size=32"></img> this approach rely on cache*/ }
          
                    <img title={item.id} className='itemThumbnail' src={`/dashboard/thumbnail/${item.id}.png`}></img>
                    <div className='detailPanel'>
                        <div className='tagPlaceholder'>
                            {item.tags?.map(tag => (<div>{tagList.get(tag)}</div>))}
                        </div> 
                        <div className='itemUrl'>
                            
                            {new URL(item.url).origin}
                        </div>   
                        <div className='itemNote'>{item.note}</div>                      
                    </div>               
                </div>
                <div className='commandBar'>
                    <img title='delete' onClick={(e) => { e.preventDefault(); onItemDelete(item.id);}} src={`${import.meta.env.BASE_URL}/delete.svg`}></img>
                </div>
            </a>))}
        </div>
    </div>);
}

export default ListView;