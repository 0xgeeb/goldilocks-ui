export const useGoldiswapMath = () => {

  const floorPrice = (fsl: number, supply: number): number => {
    return fsl / supply
  }
  
  //todo: this is the old formula
  const marketPrice = (fsl: number, psl: number, supply: number): number => {
    return floorPrice(fsl, supply) + (psl / supply) * ((psl + fsl) / fsl)**5
  }

  const simulateBuyDry = (locks: number, fsl: number, psl: number, supply: number): number => {
    let _leftover = locks
    let _fsl = fsl
    let _psl = psl
    let _supply = supply
    let _purchasePrice = 0
    let _tax = 0
    let _market = 0
    let _floor = 0
    const increment = _supply / 100000
    while(_leftover >= increment) {
      _market = marketPrice(_fsl, _psl, _supply)
      _floor = floorPrice(_fsl, _supply)
      _purchasePrice += _market*increment
      _supply += increment
      if(_psl / _fsl >= 0.50) {
        _fsl += _market*increment
      }
      else {
        _fsl += _floor*increment
        _psl += (_market - _floor)*increment
      }
      _leftover -= increment
    }
    if(_leftover > 0) {
      _market = marketPrice(_fsl, _psl, _supply)
      _floor = floorPrice(_fsl, _supply)
      _purchasePrice += _market * _leftover
      _supply += _leftover
      if(_psl / _fsl >= 0.50) {
        _fsl += _market * _leftover
      }
      else {
        _psl += (_market - _floor) * _leftover
        _fsl += _floor * _leftover
      }
    }
    _tax = _purchasePrice * 0.003
    return _purchasePrice + _tax
  }

  const simulateSellDry = (locks: number, fsl: number, psl: number, supply: number): number => {
    let _leftover = locks
    let _fsl = fsl
    let _psl = psl
    let _supply = supply
    let _salePrice = 0
    let _tax = 0
    let _market = 0
    let _floor = 0
    const increment = _supply / 100000
    while(_leftover >= increment) {
      _market = marketPrice(_fsl, _psl, _supply)
      _floor = floorPrice(_fsl, _supply) 
      _salePrice += _market*increment
      _supply -= increment
      _leftover -= increment
      _fsl -= _floor*increment
      _psl -= (_market - _floor)*increment
    }
    if(_leftover > 0) {
      _market = marketPrice(_fsl, _psl, _supply)
      _floor = floorPrice(_fsl, _supply)
      _salePrice += _market * _leftover
      _psl -= (_market - _floor) * _leftover
      _fsl -= _floor * _leftover
      _supply -= _leftover
    }
    _tax = _salePrice * 0.05
    return _salePrice - _tax
  }

  return { floorPrice, marketPrice, simulateBuyDry, simulateSellDry }
}