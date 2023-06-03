<template>
    <div class="w-full h-screen flex flex-col py-6 sm:px-20 justify-center items-center bg-[#2acc97]/30">
        <div class="w-full flex flex-col items-center justify-center gap-6 bg-white py-10 sm:rounded-lg text-[#1d1d1d]">
            <p class="text-7xl font-semibold">404</p>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-40 h-40" viewBox="0 0 640 512">
                <path fill="currentColor" d="M256 32c0-17.7-14.3-32-32-32s-32 14.3-32 32v9.8c0 39-23.7 74-59.9 88.4C71.6 154.5 32 213 32 278.2V352c0 17.7 14.3 32 32 32s32-14.3 32-32v-73.8c0-10 1.6-19.8 4.5-29l160.6 248.2c9.6 14.8 29.4 19.1 44.3 9.5s19.1-29.4 9.5-44.3L222.6 320H304l38.4 51.2c10.6 14.1 30.7 17 44.8 6.4s17-30.7 6.4-44.8l-43.2-57.6c-9.1-12.1-23.3-19.2-38.4-19.2h-71.5l-56.8-80.2l-.2-.3c44.7-29 72.5-79 72.5-133.6v-9.8zM96 80a48 48 0 1 0-96 0a48 48 0 1 0 96 0zm368 206.1l58.6 53.9c4.8 4.4 11.9 5.5 17.8 2.6s9.5-9 9-15.5l-5.6-79.4l78.7-12.2c6.5-1 11.7-5.9 13.1-12.2s-1.1-13-6.5-16.7l-65.6-45.1L603 92.2c3.3-5.7 2.7-12.8-1.4-17.9s-10.9-7.2-17.2-5.3l-76.1 23.1l-29.4-74C476.4 12 470.6 8 464 8s-12.4 4-14.9 10.1l-29.4 74l-76.1-23.2c-6.3-1.9-13.1.2-17.2 5.3s-4.6 12.2-1.4 17.9l39.5 69.1l-65.6 45.1c-5.4 3.7-8 10.3-6.5 16.7c.1.3.1.6.2.8H312c20.1 0 39.2 7.5 53.8 20.8l18.4 2.9l-1.2 17.8l36.2 48.3c2.1 2.8 3.9 5.7 5.5 8.6l39.3-36.1z"/>
            </svg>
            <div class="w-full flex flex-col items-center gap-2">
                <p class="text-3xl font-medium text-center">Whoops!</p>
                <p class="text-xl font-medium text-center">
                    We couldn't find the page<br>you're looking for 
                </p>
            </div>
            <RouterLink to="/">
                <button class="flex items-center gap-1 px-3 py-2 rounded-lg bg-[#2acc97]/80 text-white text-[14px] font-semibold hover:bg-[#2acc97]/90 active:bg-[#2acc97]">
                    <p>Back to Home</p>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                    </svg>

                </button>
            </RouterLink>
        </div>
    </div>
</template>