<template>
    <canvas id="weatherChart"></canvas>
</template>

<script>
import { mapState } from "pinia";
import { useWeatherStore } from '@/stores';
import Chart from 'chart.js/auto';

export default {
    setup() {
        const weatherStore = useWeatherStore()
        return { weatherStore }
    },

     props: {
        weatherData: Object
    },

    data() {
        return {
            chart: null
        }
    },

    watch: {
        hourlyWeatherData(newData) {
            if (newData && newData.length > 0) {
                this.renderChart(); 
            }
        }
    },

    computed: {
        ...mapState(useWeatherStore, ['hourlyWeatherData']),
    },

        methods: {
            generateTimeLabels() {
            const labels = [];
            for (let i = 0; i < 24; i++) {
                labels.push(`${i}:00`);
            }
            return labels;
            },

            mapHourlyDataToLabels(hourlyData) {
                const timeLabels = this.generateTimeLabels();
                const temperatureData = new Array(24).fill(null);

                hourlyData.forEach(item => {
                    const date = new Date(item.dt_txt);
                    const hour = date.getHours();
                    temperatureData[hour] = item.main.temp; 
                });

                return { timeLabels, temperatureData };
            },


            renderChart() {
                const hourlyData = this.hourlyWeatherData;
        
                const { timeLabels, temperatureData } = this.mapHourlyDataToLabels(hourlyData);

                const ctx = document.getElementById('weatherChart').getContext('2d');
            
                this.chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: timeLabels,
                        datasets: [
                            {
                                label: 'Temperature (°C)',
                                data: temperatureData, 
                                borderColor: 'rgba(75, 192, 192, 1)',
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderWidth: 5,
                                fill: true,
                                spanGaps: true
                            }
                        ]
                    },
                    options: {
                        plugins: {
                            legend: {
                                labels: {
                                    font: {
                                        size: 24
                                    }
                                }
                            }
                        },
                        animations: {
                            tension: {
                                duration: 1000,
                                easing: 'linear',
                                from: 1,
                                to: 0,
                                loop: true
                            }
                        },
                        scales: {
                            x: {
                            title: {
                                display: true,
                                text: 'Time',
                                font: {
                                size: 20,
                                style: 'oblique',
                                }
                            },
                            ticks: {
                                font: {
                                    size: 16
                                },
                            }
                            },
                            y: {
                            title: {
                                display: true,
                                text: 'Temperature (°C)',
                                font: {
                                size: 20,
                                style: 'oblique'
                                }
                            },
                            ticks: {
                                font: {
                                size: 16
                                }
                            }
                            }
                        },
                        layout: {
                        },
                    }
                })
            }
    },
}
</script>

<style lang="scss" scoped>
#weatherChart {
    height: 372px;
    width: 744px;
    margin-left: 0; 
    margin-right: auto;
}


@media(max-width: 1024px) { 
    #weatherChart {
        margin-top: 7rem;
        width: 100%;
    }

   
 }
</style>