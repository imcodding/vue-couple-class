<template>
  <div class="couple-content-seat">
    <div>
      <h3>자리배치</h3>
    </div>
    <div class="couple-content-box">
      <div class="couple-seat-info">
        <h4>분단 시작</h4>
        <div class="radio-input">
          <label>
            <input type="radio" id="value-1" name="seat-type" value="1" checked/>
            <span>남</span>
          </label>
          <label>
            <input type="radio" id="value-2" name="seat-type" value="2" />
            <span>여</span>
          </label>
          <span class="selection"></span>
        </div>  
        <div class="couple-seat-info-sub">
          <h4>분단별 인원 수</h4>
          <div>
            <label>남: </label><input type="number" min="1"/>
            <label>여: </label><input type="number" min="1"/>
          </div>
        </div>
        <button type="button">자리정하기</button>
      </div>
      <div class="couple-seat-desk">
        <div>자리</div>
        <button type="button">저장하기</button>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<script setup>
</script>