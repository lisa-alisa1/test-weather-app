<template>
    <header>
        <div class="logo-block">
            WeatherApp
            <img src="../assets/img/icons/logo.svg" alt="" class="logo">
        </div>
        
        <nav>
            <ul>
                <li>
                    <RouterLink to="/">
                        Home
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/favorites">
                        Favorites
                    </RouterLink>
                </li>
                
            </ul>
        </nav>
    </header>
</template>


<script>
export default {
    name: 'TheHeader'
}
</script>


<style scoped lang="scss">
@import '../assets/scss/variables';

header {
    display: flex;
    align-items: center;
    background-color: $primary-color;
    height: 4rem;
    padding: 0 40px;
    color: $secondary-color;

    .logo-block {
        display: flex;
        align-items: center;
        font-size: 25px;

        img {
                margin-left: 5px;
        }
    }

    .logo {
        width: 30px;
        height: 30px;
    }

    nav {
        margin-left: 15px;
        ul {
            display: flex;
            font-size: 15px;

            li {
                padding: 0 15px;

                a {
                    color: $secondary-color;
                    font-size: 20px;
                    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
                } 
            } 
        }
        
    }
}

@media( max-width: 780px) { 
    header {
        .logo-block {
            font-size: 1.5em;
        }
    }
}

@media( max-width: 460px) {
    header {
        height: 5.5rem;
        min-width: 100%;
    }
}
</style>