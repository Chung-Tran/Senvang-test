import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,                // retry 2 lần nếu fail
            refetchOnWindowFocus: false, // không tự refetch khi đổi tab
            staleTime: 1000 * 60,    // data "fresh" trong 1 phút
            cacheTime: 1000 * 60 * 5 // giữ cache 5 phút
        },
    },
});

export default queryClient;
