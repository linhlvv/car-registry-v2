<template>
    <div class="intro text-white text-opacity-90">
        <p>
            <strong>RegistryTotal</strong>
        </p>
        <p class="flex items-center justify-center text-center font-medium">
            This website is built in order
            to assist the Register Department
            and registration centers around the country
            in managing car registration
        </p>
        <div class="flex flex-col gap-1 items-center">
            <p class="font-medium">Contact to register an account</p>
            <div class="flex items-center justify-center w-full">
                <div class="flex flex-col w-full gap-2">
                    <div class="flex items-center w-full">
                        <div class="w-[16%] flex justify-end mr-2">
                            <i class="fa-solid fa-envelope"></i>
                        </div>
                        <div class="text-xs font-bold w-[84%]">quangtuanlinh@gmail.com</div>
                    </div>
                    <div class="flex items-center w-full">
                        <div class="w-[16%] flex justify-end mr-[9px]">
                            <i class="fa-solid fa-phone"></i>
                        </div>
                        <div class="text-xs font-bold w-[84%]">0928120810</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .intro {
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: #2acc97;
        padding: 2rem 1rem;
        gap: 1rem;
    }
    p {
        text-align: center;
    }
    @media screen and (max-width: 768px) {
        .intro {
            display: none;
        }
    }
</style>