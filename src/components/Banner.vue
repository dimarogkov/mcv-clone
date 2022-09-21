<template>
    <div class="section banner">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="banner__cont">
                        <h1 class="h1 title">Medium Clone</h1>
                        <div class="text">A place to share knowledge</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'mcv-banner',
};
</script>

<style>
.banner {
    position: relative;
    width: 100%;
    padding: 80px 0;
    background-color: var(--color-grey);
    margin-bottom: 40px;
}
.banner__cont {
    position: relative;
    width: 100%;
    text-align: center;
}
.banner__cont .title {
    font-weight: 500;
    margin-bottom: 15px;
}
</style>
