import { getSubreddits } from "@/api/getSubreddits";
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCurrentSubreddit } from "@/redux/subredditSlice";
import { ThemeToggle } from "./ui/themetoggle";
export const Sidebar = ({
    className,
    children,
}: {
    className?: string
    children?: React.ReactNode
}) => {

    const { isAuthorized } = useAppSelector(
        (state: RootState) => state.authorizedSlice
    )

    return (
        <div
            className={cn('flex-col p-4 bg-background absolute md:static border-r-[1px] z-40 h-full', className)}
        >
            {children}
            {!isAuthorized && <ThemeToggle />}
        </div>
    )
}

export const DefaultSidebarContent = () => {
    const [subreddits, setSubreddits] = useState([])
    const navigate = useNavigate()
    const dispatch: AppDispatch = useAppDispatch()

    const handleClick = (path: string) => {
        navigate(`/r/${path}`)
        dispatch(setCurrentSubreddit(path))
    }
    
    useEffect(() => {
        const fetchSubreddits = async () => { 
            const subreddits = await getSubreddits("popular")
            const topSubreddits = subreddits.slice(1, 10);
            setSubreddits(topSubreddits)
        }

        fetchSubreddits()
    }, [])


    return (
        <div className="flex flex-col space-y-4 pt-12">
            <div className="flex flex-col space-y-2">
            </div>
            <div className="flex flex-col space-y-2">
                <h2 className="text-md font-bold">popular subreddits</h2>
                {subreddits &&
                    subreddits.map((subreddit: any) => (
                        <a
                            key={subreddit.id}
                            onClick={() =>
                                handleClick(subreddit.data.display_name)
                            }
                            className="text-sm leading-none hover:cursor-pointer hover:text-accent transition delay-150"
                        >
                            {subreddit.data.display_name}
                        </a>
                    ))}
            </div>
        </div>
    )
}

export const SubredditSidebarContent = ({ subreddit }: { subreddit?: string}) => { 
    return (
        <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
                <h2 className="text-lg font-bold">About</h2>
                <p className="text-sm">
                    This is the {subreddit} subreddit. It is a place to share
                    your favorite {subreddit} content.
                </p>
            </div>
            <div className="flex flex-col space-y-2">
                <h2 className="text-lg font-bold">Links</h2>
            </div>
        </div>
    )
}