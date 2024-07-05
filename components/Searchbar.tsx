'use client'
import { scrapeAndStoreProduct } from "@/lib/actions";
import { FormEvent, useState } from "react"

const isValidAmazonProductURL = (url: string) =>{

  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    //check if hostname containes amazon.com 
    if(
      hostname.includes('amazon.com') ||
      hostname.includes('amazon.') || 
      hostname.endsWith('amazon') ||
      hostname.includes('flipkart.com') ||
      hostname.includes('flipkart') ||
      hostname.endsWith('flipkart')
      ){
        return true;
      }
  } catch (error) {
    return false;
  }
  return false;
}

   
// we are writing this use client because in this page we are doing an activity like submit which is defined in client rather than a server

const Searchbar = () => {
    const [searchPrompt , setSearchprompt] = useState('');
    const [isLoading , setIsLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) =>{
      event.preventDefault();

      const isValidLink = isValidAmazonProductURL(searchPrompt);

      // alert(isValidLink ? 'valid' : 'invaliud')
      
      if(!isValidLink) return alert('Please provide a valid Amazon link')

        try {
          setIsLoading(true);

          //scrape the product page
          const product = await scrapeAndStoreProduct(searchPrompt);
        } catch (error) {
          console.log(error)
        }finally{
          setIsLoading(false);
        }
    }


  return (
    <form 
    className='flex flex-wrap gap-4 mt-12' 
    onSubmit={handleSubmit}>

    <input
        type="text"
        value={searchPrompt}
        onChange={(e)=> setSearchprompt(e.target.value)}
        placeholder="Enter the Product link"
        className="searchbar-input"
    />

    <button 
     type="submit" 
     className="searchbar-btn"
     disabled={searchPrompt === ''}
     >
        {isLoading ? 'Searching...' : 'Search'}
    </button>

    </form>
  )
}

export default Searchbar
 