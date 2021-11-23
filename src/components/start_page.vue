<template>
    <v-container fluid fill-height class="entire">
        <div class="canvas">
            <!-- 상원 -->
            <svg class="c01">
                <circle cx="70" cy="70" r="57.5" />
            </svg>
            <!-- 상원라인 -->
            <div class="c01_line01"></div>
            <div class="c01_line02"></div>
            <div class="c01_line03"></div>
            <div class="c01_line04"></div>

            <!-- 삼각형 -->
            <svg class="tri">
                <polygon points="145,25 268,238 22,238" />
            </svg>
            <div class="black"></div>
            <svg class="tri02">
                <polygon points="145,25 268,238 22,238" />
            </svg>

            <!-- 사각형 -->
            <div class="rect">
                <span class="line01"></span>
                <span class="line02"></span>
                <span class="line03"></span>
                <span class="line03_1"></span>
                <span class="line04"></span>
            </div>

            <!-- 하원 -->
            <svg class="c02">
                <circle cx="70" cy="70" r="57.5" />
            </svg>
            <!-- 하원라인 -->
            <div class="c02_line01"></div>
            <div class="c02_line02"></div>
            <div class="c02_line03"></div>
            <div class="c02_line04"></div>


            <!-- ㅇ -->
            <svg class="c03">
                <circle cx="55" cy="55" r="40" />
            </svg>
            <!-- 다른색 -->
            <svg class="c04">
                <circle cx="55" cy="55" r="40" />
            </svg>
            <!-- ㅗ -->
            <div class="first_letter">
                <span class="line01"></span>
                <span class="line02"></span>
            </div>


            <!-- ㅈ -->
            <div class="second_letter01"></div>
            <!-- l -->
            <div class="second_letter02"></div>
            <!-- ㅇ -->
            <svg class="c05">
                <circle cx="42.5" cy="42.5" r="30" />
            </svg>

            <!-- ㅇ -->
            <svg class="c06">
                <circle cx="42.5" cy="42.5" r="30" />
            </svg>
            <!-- - -->
            <div class="third_letter01"></div>
            <!-- l -->
            <div class="third_letter02"></div>

            <!-- - -->
            <div class="fourth_letter01"></div>
            <!-- / -->
            <div class="fourth_letter02_wrap">
                <div class="fourth_letter02"></div>
            </div>
            <!-- - -->
            <div class="fourth_letter03"></div>
            <!-- | -->
            <div class="fourth_letter04"></div>
            <!-- | -->
            <div class="fourth_letter05"></div>

            <!-- ㅇ -->
            <svg class="c07">
                <circle cx="42.5" cy="42.5" r="30" />
            </svg>
            <!-- l -->
            <div class="fifth_letter01"></div>
            <!-- ㅁ -->
            <div class="fifth_letter02"></div>
            <div class="fifth_letter04"></div>
            <div class="fifth_letter05"></div>
        </div>
        <div class="buttonOn">
            <h1 class="title white--text">Press to start (Online.ver)</h1>
            <v-btn fab large class="mt-5" color="#e6ebce" dark to="/main"></v-btn>
        </div>
        <div class="buttonOff">
            <h1 class="title white--text">Press to start (Offline.ver)</h1>
            <v-btn fab large class="mt-5" color="#fe4063" dark to="/gameSelect"></v-btn>
        </div>
    </v-container>
</template>
<style src="./css/start_page_ani.css"></style>